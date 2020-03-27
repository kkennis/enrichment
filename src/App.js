import React, { PureComponent } from "react";
import Airtable from "airtable";
import OutlinedCard from "../src/components/OutlinedCard";
import FilterForm from "../src/components/FilterForm";
import AddForm from "../src/components/AddForm";
import Button from "@material-ui/core/Button";

//@TODO: Need to figure out how to cache results so we don't hit api so many times
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE = process.env.REACT_APP_BASE;
const base = new Airtable({ apiKey: API_KEY }).base(BASE);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showAddForm: false,
      records: [],
      filteredRecords: [],
      filters: []
    };
    this.filterResults = this.filterResults.bind(this);
  }
  componentDidMount() {
    base("Activities")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        this.setState({
          records
        });
        this.setState({
          filteredRecords: records
        });
        // console.log(records);
        // Airtable API’s way of giving us the next record in our spreadsheet
        fetchNextPage();
      });
  }

  // sendFilters(childData) {
  //   console.log("send filters");
  //   // this.setState({ filters: childData });
  //   // console.log(childData);

  //   // console.log("app this.state.filters");
  //   // console.log(this.state.filters);
  //   this.filterResults(childData);
  // }

  filterResults(filters) {
    //filter - if statements to prevent undefined errors

    let results = this.state.records.filter(function(record) {
      if (!record.fields["Activity Name"]) {
        record.fields["Activity Name"] = "";
      }
      if (!record.fields["Recommended Ages"]) {
        record.fields["Recommended Ages"] = "";
      }
      if (!record.fields["Location"]) {
        record.fields["Location"] = "";
      }
      if (!record.fields["Parent Involvement"]) {
        record.fields["Parent Involvement"] = "";
      }
      if (!record.fields["Description"]) {
        record.fields["Description"] = "";
      }
      if (!record.fields["Device Required"]) {
        record.fields["Device Required"] = "";
      }

      //@TODO: fill in with values from filters
      return (
        record.fields["Location"].includes(filters.place) &&
        record.fields["Device Required"].includes(filters.screens) &&
        record.fields["Recommended Ages"].includes(filters.age) &&
        record.fields["Parent Involvement"].includes(filters.involvement) &&
        (record.fields["Description"].includes(filters.search) ||
          record.fields["Activity Name"].includes(filters.search))
      );
    });

    this.setState({
      filteredRecords: results
    });
  }

  toggleAddForm() {
    const { showAddForm } = this.state;
    this.setState({'showAddForm': !showAddForm});
  }

  render() {
    const { showAddForm } = this.state;
    return (
      <div className="App">
        <Button
          onClick={() => { this.toggleAddForm() }}
          variant="contained"
        >
          {showAddForm ? 'Hide Form' : 'Add Item'}
        </Button>
        {showAddForm && <AddForm />}
        
        <FilterForm sendFilters={this.filterResults} />
        {this.state.filteredRecords.length > 0 ? (
          this.state.filteredRecords.map((record, index) => (
            <div key={index}>
              <OutlinedCard
                activityName={record.fields["Activity Name"]}
                activityPlace={record.fields["Location"]}
                description={record.fields["Description"]} // not in API?
                gradeRange={record.fields["Recommended Ages"]}
                parentInvolvement={record.fields["Parent Involvement"]}
                screen={record.fields["Device Required"]}
                preparation={record.fields["Preparation/Supplies"]}
                learnMoreLink={record.fields["Link"]}
              />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default App;
