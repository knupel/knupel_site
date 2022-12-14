import React from "react";

import { Menu } from "../menu";

import "./header.css";

import menu from "./../../../media/json/menu.json";

export default function Header() {
  return (
    <header>
      <Menu content={menu} />
    </header>
  );
}
