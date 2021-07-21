import React from "react";

import { Menu } from "./menu";

import "../css/header.css";

const menu =
  '{ "menu": [' +
  '{"name": "home", "label": "HOME", "what": "/"},' +
  '{"name": "about", "label": "ABOUT", "what": "/about"},' +
  '{"name": "contact", "label": "CONTACT", "what": "/contact"}]}';

export default function Header() {
  const menu_parse = JSON.parse(menu);
  return (
    <header>
      <Menu content={menu_parse} />
    </header>
  );
}
