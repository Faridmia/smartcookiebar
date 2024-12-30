import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import DashboardSettings from "./DashboardSettings";

document.addEventListener("DOMContentLoaded", function () {
  // Cookie Banner Logic
  let cookie = Cookies.get("SmartcbCookieSetCookie");
  let SmartcbDeclineCookie = Cookies.get("SmartcbDeclineCookie");
  let bannerElement = document.querySelector(".smartcb-react-cookie-banner-wrapper");
  if (bannerElement && !cookie && !SmartcbDeclineCookie) {
    ReactDOM.render(<App />, bannerElement);
  }

  // Admin Dashboard Logic
  var adminElement = document.querySelector(".smartcookiebar-admin-app");

  if (adminElement) {
    ReactDOM.render(<DashboardSettings />, adminElement);
  }
});

