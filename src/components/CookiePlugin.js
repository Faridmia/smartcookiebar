import React, { Component } from 'react';
import axios from 'axios';

class CookiePlugin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      bannerTitle: '',
      bannerDesc: '',
      acceptBtn: '',
      declineBtn: '',
    };
    this.SmartcbAcceptCookies = this.SmartcbAcceptCookies.bind(this);
    this.SmartcbDeclineCookies = this.SmartcbDeclineCookies.bind(this);

  }

  SmartcbAcceptCookies() {
    Cookies.set("SmartcbCookieSetCookie", true, { expires: 7 });
    this.setState({ visible: false });

    console.log( appCookie.cookie_assets_url );
  }

  SmartcbDeclineCookies() {
    Cookies.set("SmartcbDeclineCookie", false);
    this.setState({ visible: false });
  }

  componentDidMount() {
    const url = `${appCookie.apiUrl}smartcb/v1/settings`;
    axios
      .get(url)
      .then( (response) => {
          this.setState({
              bannerTitle: response?.data?.smartcb_banner_title || 'Are you okay with Cookies?',
              bannerDesc: response?.data?.smartcb_banner_desc || `Cookies let us give you a better experience and improve our products. We won't turn them on until you accept.`,
              acceptBtn: response?.data?.smartcb_banner_accept_btn || 'Accept',
              declineBtn: response?.data?.smartcb_banner_decline_btn || 'Decline',
          });
      })
      .catch(( error ) => {
        console.error('Error fetching settings:', error);
      });

  }

  render() {
    const { visible, bannerTitle, bannerDesc, acceptBtn, declineBtn } = this.state;
    return visible ? (
      <div className="CookieBanner container fixed-bottom alert alert-light border alert-dismissible fade show" role="alert">
        <div className="row justify-content-between align-items-center">
          <div className="col-1 h-full d-flex align-items-center justify-content-center cookie-img-right">
            <img src={`${appCookie.cookie_assets_url}/assets/cookie.png`} width="80px" />
          </div>
          <div className="col-8">
            <p className="m-0 fw-bolder">{bannerTitle}</p>
            <p className="lh-base fs-6 m-0">
              {bannerDesc}
            </p>
          </div>
          <div className="col-2">
            <div className="row cookie-right-button-part">
              <button id="accept" onClick={this.SmartcbAcceptCookies} type="button" className="btn btn-info text-white mb-2 cookie-btn-one">
              {acceptBtn}
              </button>
              <button id="decline" onClick={this.SmartcbDeclineCookies} type="button" className="btn btn-outline-info cookie-btn-two">
               {declineBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default CookiePlugin;
