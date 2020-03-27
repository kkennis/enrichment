import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// @TODO: STILL NEED TO GET THIS WORKING
export default class SimpleSelect extends PureComponent {
  // const [age, setAge] = React.useState("");

  // const handleChange = event => {
  //   setAge(event.target.value);
  // };

  static propTypes = {
    helperText: PropTypes.string,
    id: PropTypes.string,
    labelId: PropTypes.string,
    label: PropTypes.string
  };

  static defaultProps = {
    helperText: ""
  };

  render() {
    const { helperText, id, label, labelId } = this.props;

    return (
      <div>
        <FormControl>
          <InputLabel shrink id={labelId}>
            {label}
          </InputLabel>
          <Select
            labelId={labelId}
            id={id}
            // value={age}
            // onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      </div>
    );
  }
}
