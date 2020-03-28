import React, { PureComponent } from "react";
import Airtable from "airtable";
import OutlinedCard from "../src/components/OutlinedCard";
import FilterForm from "../src/components/FilterForm";
import AddForm from "../src/components/AddForm";
import Button from "@material-ui/core/Button";
import Pagination from '@material-ui/lab/Pagination';
import './styles.scss';
import EmailButton from "./components/EmailButton";

//@TODO: Need to figure out how to cache results so we don't hit api so many times
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE = process.env.REACT_APP_BASE;
const base = new Airtable({ apiKey: API_KEY }).base(BASE);
const perPage = 15;

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showAddForm: false,
      records: [],
      filteredRecords: [],
      filters: [],
      page: 1,
      viewableResults: []
    };
    this.filterResults = this.filterResults.bind(this);
    this.toggleAddFormFromChild = this.toggleAddFormFromChild.bind(this);
  }

  componentDidMount() {
    let count = 0;
    base("Activities")
      .select({
        view: "Grid view", /*maxRecords: 100,*/ sort: [
          { field: 'Activity Name', direction: 'asc' }], filterByFormula: 'FIND("Yes",{Reviewed})'
      })
      .eachPage((data, fetchNextPage) => {
        console.log(data.length);
        let records = this.state.records;
        this.setState({
          records: records.concat(data)
        });
        if (count === 0) {
          count++;
          console.log(data.slice(perPage - 1));
          this.setState({
            viewableResults: data.slice(0, perPage - 1)
          })
          console.log("viewable" + this.state.viewableResults);
        }
        this.setState({
          filteredRecords: records.concat(data),
        });
        console.log(records.length);
        // Airtable API’s way of giving us the next record in our spreadsheet
        fetchNextPage();
      });

  }
  /*
    //calling API
    filterResults(filters){
      let queryString = 'AND(OR(FIND("'+filters.search+'",{Activity Name}),FIND("'+filters.search+'",{Description}),FIND("'+filters.search+'",{Preparation/Supplies}))';
      console.log(filters.place);
      if (filters.place !== ""){
        queryString = queryString.concat(',"'+filters.place+'"={Location}');
      }
      if (filters.involvement !== ""){
        queryString = queryString.concat(',"'+filters.involvement+'"={Parent Involvement}');
      }
      if (filters.age !== ""){
        queryString = queryString.concat(',"'+filters.age+'"={Recommended Ages}');
      }
      if (filters.screens !== ""){
        queryString = queryString.concat(',"'+filters.screens+'"={Device Required}');
      }
      queryString+=')';
      console.log(queryString);
      base("Activities")
        .select({ view: "Grid view" , maxRecords: 20, sort: [
          {field: 'Activity Name', direction: 'asc'}    ], filterByFormula:queryString})
        .eachPage((data, fetchNextPage) => {
          this.setState({
            records: data
          });
          this.setState({
            filteredRecords: data
          });
          // Airtable API’s way of giving us the next record in our spreadsheet
          fetchNextPage();
        });
    }*/

  // HANDLE PAGE CHANGE
  handlePageChange = (event, value) => {
    console.log(this.state.page);
    console.log(this.state.filteredRecords);
    console.log(this.state.viewableResults);
    this.setState({ page: value })
    if (perPage * value >= this.state.filteredRecords.length)
      this.setState({
        viewableResults: (this.state.filteredRecords.slice((value - 1) * perPage))
      })
    else
      this.setState({
        viewableResults: (this.state.filteredRecords.slice((value - 1) * perPage, value * perPage)
        )
      });
  };

  //filtering existing results
  filterResults(filters) {
    let results = this.state.records.filter(function (record) {
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
      //edge cases of location
      let test = false;
      if (filters.place == "") { test = true }
      else if (record.fields["Location"].includes(filters.place)) {
        if (record.fields["Location"].includes("and") && filters.place.includes("and")) {
          test = true;
        }
        else {
          if (!record.fields["Location"].includes("and") && record.fields["Location"].includes(filters.place)) {
            test = true;
          }
        }
      }
      //filtering
      return (
        ///want to change location includes to ==, but causes filter error O.o I HAVE NO IDEA WHYYYY!!!!!
        record.fields["Device Required"].includes(filters.screens) && test &&
        record.fields["Recommended Ages"].includes(filters.age) &&
        record.fields["Parent Involvement"].includes(filters.involvement) &&
        (record.fields["Description"].includes(filters.search) ||
          record.fields["Activity Name"].includes(filters.search))
      );
    });
    this.setState({
      viewableResults: results.slice(0, perPage),
      filteredRecords: results,
      page: 1
    });
  }

  toggleAddForm() {
    const { showAddForm } = this.state;
    this.setState({ 'showAddForm': !showAddForm });
  }

  toggleAddFormFromChild(bool) {
    this.setState({ 'showAddForm': bool });
  }

  renderNoResults() {
    if (this.state.records.length == 0) {
      return (
        <h2>Loading...</h2>
      )
    }
    else {
      return (
        <div>
          <h2>Sorry, we don't have activities with what you're looking for.</h2>
          <p>Perhaps try changing your filters.</p>
        </div>
      )
    }
  }
  renderPagination() {
    return (
      <Pagination count={Math.ceil(this.state.filteredRecords.length / perPage)}
        page={this.state.page}
        onChange={this.handlePageChange} showFirstButton showLastButton color="primary" />
    )
  }

  render() {
    const { showAddForm } = this.state;
    const { email } = this.props;
    return (
      <div className="enrichment-app">
        <div className="enrichment-app__form-wrapper">
          <Button
            onClick={() => { this.toggleAddForm() }}
            variant="contained"
          >
            {showAddForm ? 'Hide Form' : 'Add Activity'}
          </Button>
          <EmailButton />
        </div>
        {showAddForm && <AddForm action={this.toggleAddFormFromChild} />}

        <div class="resultsDiv">
          <FilterForm sendFilters={this.filterResults} />
          {this.state.viewableResults.length > (perPage - 2) &&
            this.renderPagination()}
          {this.state.viewableResults.length > 0 ? (
            this.state.viewableResults.map((record, index) => (
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
              this.renderNoResults()
            )}

          {this.state.viewableResults.length > (perPage - 2) &&
            this.renderPagination()}
        </div>
      </div>
    );
  }
}

export default App;
