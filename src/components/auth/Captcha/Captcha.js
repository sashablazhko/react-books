import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";

class Captcha extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      callback: "not fired",
      value: "[empty]",
      load: false,
      expired: "false",
    };
    this.reCaptchaRef = React.createRef();
  }

  handleChange = value => {
    console.log("Captcha value:", value);
    this.setState({ value });
  };

  asyncScriptOnLoad = () => {
    this.setState({ callback: "called!" });
    console.log("scriptLoad - reCaptcha Ref-", this.reCaptchaRef);
  };

  handleExpired = () => {
    this.setState({ expired: "true" });
  };

  render() {
    return (
      <ReCAPTCHA
        style={{ display: "inline-block" }}
        ref={this.reCaptchaRef}
        sitekey="6Len338UAAAAACnubnwaaj--S1zY93FoZ-37Ie5n"
        onChange={this.handleChange}
        asyncScriptOnLoad={this.asyncScriptOnLoad}
      />
    );
  }
}

export default Captcha;
