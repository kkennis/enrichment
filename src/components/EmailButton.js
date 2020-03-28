import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

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
      <a className="MuiButtonBase-root MuiButton-root MuiButton-contained" href={`mailto:${email}`}>EmailButton</a>
    );
  }
}
