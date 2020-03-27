import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
});

class TextAreaInput extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string
  };

  onChange = e => {
    this.props.onChange(e.target.value);
  };

  render() {
    const { classes, id, label, placeholder, value } = this.props;

    return (
      <FormControl className={classes.formControl}>
        <TextField
          id={id}
          label={label}
          multiline
          onChange={this.onChange}
          placeholder={placeholder}
          rows="3"
          rowsMax="4"
          value={value}
        />
      </FormControl>
    );
  }
}

export default withStyles(styles)(TextAreaInput);
