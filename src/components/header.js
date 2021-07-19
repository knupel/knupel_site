import React from "react";

import PropTypes from "prop-types";
import { Link } from "gatsby";
import { Menu } from "./menu";

import "../css/header.css";

const Header = ({ siteTitle }) => (
  <header>
    <Menu />
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
