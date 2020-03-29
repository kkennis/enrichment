import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import EmailIcon from '@material-ui/icons/Email';



export default class EmailButton extends PureComponent {

  static propTypes = {
    email: PropTypes.string,
  };

  static defaultProps = {
    email: 'example@example.com'
  };

  render() {

    const { email } = this.props;

    return (
      <Button href={`mailto:${email}`} className="email-button MuiButtonBase-root MuiButton-root MuiButton-contained"
      variant="contained"
      color="default" 
      startIcon={<EmailIcon />}>Feedback</Button>
      );
  }
}
