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

class TextInput extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    helperText: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    type: "text"
  };

  onChange = e => {
    this.props.onChange(e.target.value);
  };

  render() {
    const { classes, helperText, id, label, placeholder, type, value } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <TextField
          helperText={helperText}
          id={id}
          label={label}
          onChange={this.onChange}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      </FormControl>
    );
  }
}

export default withStyles(styles)(TextInput);