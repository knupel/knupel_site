/**
 * 
 * HEADER 
 * 2021-2023
 * v 0.1.1
 * 
 * */
import React from "react";
//GATSBY
import { useContext, useState }  from "react";
// APP
import { MenuBig } from "./menu/menu_big";
import { MenuSmall }  from "./menu/menu_small";

import { menu_small, menu_big } from "./header.module.css";
import menu from "./../../../media/json/menu.json";
import { ContextMenu } from "./../../context/context_menu.js";

import { get_css_value } from "../../utils/utils";
import { WidthIsHigherThan } from "./../../utils/canvas";



export default function Header() {
  const { switch_off_menu_small } = useContext(ContextMenu);
  const [size, set_size] = useState(0);
  const browser_is = typeof window !== "undefined";
  if(size === 0 && browser_is) {
    set_size(get_css_value("--window_min"));
  }
  // here it's weird because I don't need use 'ref' on the div to be sure the window value is updated.
  // may be because the browser is checked ?
  if(WidthIsHigherThan(size)) {
    switch_off_menu_small();
    return (
      <div className={menu_big}>
        <MenuBig content={menu} />
     </div>
    );
  } else {
    return (
      <div className={menu_small}>
        <MenuSmall content={menu}/>
      </div>
    )
  }
}
