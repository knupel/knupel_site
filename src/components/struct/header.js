import React from "react";

import { Menu } from "../menu/menu";

import "./header.css";

import menu from "./../../../media/json/menu.json";

export default function Header() {
  return (
    <header>
      <Menu content={menu} />
    </header>
  );
}
