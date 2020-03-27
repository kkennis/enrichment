import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";

import TextInput from "../components/FormInput/TextInput";
import TextAreaInput from "../components/FormInput/TextAreaInput";
import SelectInput from "../components/FormInput/SelectInput";

import Button from "@material-ui/core/Button";

import Airtable from "airtable";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE = process.env.REACT_APP_BASE;
const base = new Airtable({ apiKey: API_KEY }).base(BASE);

const styles = theme => ({
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
});

class AddForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activityName: '',
      description: '',
      age: '',
      involvement: '',
      moreInfo: '',
      preparation: '',
      place: '',
      activitySetting: '',
      screenNeeded: '',
      firstName: '',
      lastName: '',
      email: '',
      screenNeededOptions: ["Yes", "No"],
      activitySettingOptions: ["Solo", "Group", "Solo or Group"],
      placeOptions: ["Indoor", "Outdoor", "Both Indoor and Outdoor"],
      involvementOptions: ["None", "Low", "Medium", "High"],
      ageOptions: ["All Ages", "Infant (0-12 months)", "Toddler (12-36 months)", "Preschool (ages 3-5)", "Kindergarten", "Grades 1-2", "Grades 3-4", "Middle School", "High School"],
    };

    this.handleInput = this.handleInput.bind(this);

  }

  handleInput(e) {
    console.log(e.target.value);
    console.log(e.target.name);
    this.setState({[e.target.name]: e.target.value});
  }

  addForm = () => {
    const {
      activityName,
      description,
      age,
      involvement,
      moreInfo,
      preparation,
      place,
      activitySetting,
      screenNeeded,
      firstName,
      lastName,
      email
    } = this.state;

    base("Activities").create(
      {
        "Activity Name": activityName,
        "Description": description,
        "Recommended Ages": age,
        "Parent Involvement": involvement,
        "Location": place,
        "Device Required": screenNeeded,
        "Solo/Group Activity - DO NOT USE": activitySetting,
        "Solo or group activity - DO NOT USE": activitySetting,
        "Screens- DO NOT USE": screenNeeded,
        "Indoor or outdoor - DO NOT USE": place,
        "Suggested By - DO NOT USE: First": firstName,
        "Suggested By - DO NOT USE: Last": lastName,
        "Suggested By Email - DO NOT USE": email,
        "Link": moreInfo,
        "Preparation/Supplies": preparation
      },
      function(err, record) {
        if (err) {
          console.error(err);
        }
        console.log(record.getId());
      }
    );
  };


  render() {
    const { classes } = this.props;
    const {
      activityName,
      description,
      age,
      involvement,
      moreInfo,
      preparation,
      place,
      activitySetting,
      screenNeeded,
      firstName,
      lastName,
      email,
      screenNeededOptions,
      activitySettingOptions,
      placeOptions,
      involvementOptions,
      ageOptions
    } = this.state;

    console.log(this.state);

    return (
      <form id="add-form">
        <TextInput
          name="activityName"
          label="Activity Name"
          id="input-activity-name"
          handleChange={this.handleInput}
          value={activityName}
        />

        <TextInput
          name="description"
          label="Description"
          id="input-description"
          handleChange={this.handleInput}
          value={description}
        />

        <SelectInput
          id="input-age"
          labelId="input-age-label"
          name="age"
          label="Recommended Ages"
          handleChange={this.handleInput}
          value={age}
          options={ageOptions}
        />

        <SelectInput
          id="input-involvement"
          labelId="input-involvement-label"
          name="involvement"
          label="Parent Involvement"
          handleChange={this.handleInput}
          value={involvement}
          options={involvementOptions}
        />

        <TextInput
          name="moreInfo"
          label="Link for More Info"
          id="input-more-info-link"
          handleChange={this.handleInput}
          value={moreInfo}
        />

        <TextAreaInput
          name="preparation"
          label="Preparation / Supplies"
          id="input-preparation"
          handleChange={this.handleInput}
          value={preparation}
        />

        <SelectInput
          id="input-place"
          labelId="input-place-label"
          name="place"
          label="Location"
          handleChange={this.handleInput}
          value={place}
          options={placeOptions}
        />

        <SelectInput
          id="input-group-activity"
          labelId="input-group-activity-label"
          name="activitySetting"
          label="Solo/Group Activity"
          handleChange={this.handleInput}
          value={activitySetting}
          options={activitySettingOptions}
        />
        <SelectInput
          id="input-screen"
          labelId="input-screen-label"
          name="screenNeeded"
          label="Screens"
          handleChange={this.handleInput}
          value={screenNeeded}
          options={screenNeededOptions}
        />

        <TextInput
          name="firstName"
          label="Suggested By First Name"
          id="input-first-name"
          handleChange={this.handleInput}
          value={firstName}
        />

        <TextInput
          name="lastName"
          label="Suggested By Last Name"
          id="input-last-name"
          handleChange={this.handleInput}
          value={lastName}
        />

        <TextInput
          name="email"
          label="Suggested By Email"
          id="input-email"
          handleChange={this.handleInput}
          value={email}
        />

        <Button
          onClick={() => { this.addForm() }}
          className={classes.formControl}
          variant="contained"
        >
          Add
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(AddForm);
