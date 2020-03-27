import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import TextInput from "../components/FormInput/TextInput";
import TextAreaInput from "../components/FormInput/TextAreaInput";

import Input from "@material-ui/core/Input";
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
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  handleChange = event => {};

  onChange = e => {
    this.props.onChange(e.target.value);
  };

  addForm = () => {
    // base("Activities").create(
    //   {
    //     //enter data values here
    //   },
    //   function(err, record) {
    //     if (err) {
    //       console.error(err);
    //     }
    //     console.log(record.getId());
    //   }
    // );
  };

  onChange = fieldPath => value => {
    // const { data, onChange } = this.props;

    // const newData = _.set(data, fieldPath, value);

    // return onChange(newData);
  };

  render() {
    const { classes } = this.props;
    return (
      <form id="add-form">
        <TextInput
          name="activityName"
          label="Activity Name"
          id="input-activity-name"
          onChange={this.onChange}
          // value={activityName}
        />

        <TextInput
          name="description"
          label="Description"
          id="input-description"
          onChange={this.onChange}
          // value={description}
        />

        <FormControl className={classes.formControl}>
          <InputLabel id="input-age-label">Age</InputLabel>
          <Select
            name="age"
            labelId="input-age-label"
            id="input-age"
            onChange={this.handleChange}
            // value={age}
          >
            <MenuItem value="" disabled>
              Age
            </MenuItem>
            <MenuItem value={"All Ages"}>All Ages</MenuItem>
            <MenuItem value={"Infant (0-12 months)"}>
              Infant (0-12 months)
            </MenuItem>
            <MenuItem value={"Toddler (12-36 months)"}>
              Toddler (12-36 months)
            </MenuItem>
            <MenuItem value={"Preschool (ages 3-5)"}>
              Preschool (ages 3-5)
            </MenuItem>
            <MenuItem value={"Kindergarten"}>Kindergarten</MenuItem>
            <MenuItem value={"Grades 1-2"}>Grades 1-2</MenuItem>
            <MenuItem value={"Grades 3-4"}>Grades 3-4</MenuItem>
            <MenuItem value={"Grades 4-5"}>Grades 4-5</MenuItem>
            <MenuItem value={"Middle School"}>Middle School</MenuItem>
            <MenuItem value={"High School"}>High School</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="input-involvement-label">Involvement</InputLabel>
          <Select
            name="involvement"
            labelId="input-involvement-label"
            id="input-involvement"
            onChange={this.handleChange}
            // value={involvement}
          >
            <MenuItem value="" disabled>
              Involvement
            </MenuItem>
            <MenuItem value={"None"}>None</MenuItem>
            <MenuItem value={"Low"}>Low</MenuItem>
            <MenuItem value={"Medium"}>Medium</MenuItem>
            <MenuItem value={"High"}>High</MenuItem>
          </Select>
        </FormControl>

        <TextInput
          name="moreInfo"
          label="Link for More Info"
          id="input-more-info-link"
          onChange={this.onChange}
          // value={moreInfo}
        />

        {/* @TODO: SWITCH TO TEXTAREA */}
        <TextAreaInput
          name="preparation"
          label="Preparation / Supplies"
          id="input-preparation"
          onChange={this.onChange}
          // value={preparation}
        />

        <FormControl className={classes.formControl}>
          <InputLabel id="input-place-label">Place</InputLabel>
          <Select
            name="place"
            labelId="input-place-label"
            id="input-place"
            onChange={this.handleChange}
            // value={place}
          >
            <MenuItem value="" disabled>
              Place
            </MenuItem>
            <MenuItem value={"Indoor"}>Indoor</MenuItem>
            <MenuItem value={"Outdoor"}>Outdoor</MenuItem>
            <MenuItem value={"Indoor or Outdoor"}>Indoor or Outdoor</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="input-group-activity-label">
            Solo/Group Activity{" "}
          </InputLabel>
          <Select
            name="groupActivity"
            labelId="input-group-activity-label"
            id="input-group-activity"
            onChange={this.handleChange}
            // value={groupActivity}
          >
            {/* <MenuItem value="" disabled>
              Solo/Group Activity
            </MenuItem> */}
            <MenuItem value={"Solo"}>Solo</MenuItem>
            <MenuItem value={"Group"}>Group</MenuItem>
            <MenuItem value={"Solo or Group"}>Solo or Group</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="input-screen-label">Screens</InputLabel>
          <Select
            name="screens"
            labelId="input-screen-label"
            id="input-screen"
            onChange={this.handleChange}
            // value={screens}
          >
            <MenuItem value="" disabled>
              Screens
            </MenuItem>
            <MenuItem value={"Yes"}>Yes</MenuItem>
            <MenuItem value={"No"}>No</MenuItem>
          </Select>
        </FormControl>

        <TextInput
          name="firstName"
          label="Suggested By First Name"
          id="input-first-name"
          onChange={this.onChange}
          // value={firstName}
        />

        <TextInput
          name="lastName"
          label="Suggested By Last Name"
          id="input-last-name"
          onChange={this.onChange}
          // value={lastName}
        />

        <TextInput
          name="email"
          label="Suggested By Email"
          id="input-email"
          onChange={this.onChange}
          type="email"
          // value={email}
        />

        <Button
          onClick={this.addForm}
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
