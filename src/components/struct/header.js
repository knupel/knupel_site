import React from "react";
import { useContext }  from "react";

// APP
import { MenuBig } from "./menu/menu_big";
import { MenuSmall }  from "./menu/menu_small";
import { Window_is_higher_than } from "./../../utils/canvas";
import { menu_small } from "./header.module.css";
import menu from "./../../../media/json/menu.json";
import { ContextMenu } from "./../../context/context_menu.js"






export default function Header() {
  const { switch_off_menu_small } = useContext(ContextMenu);
  if(Window_is_higher_than(780)) {
    switch_off_menu_small();
    return (
      <header>
        <MenuBig content={menu} />
     </header>
    );
  } else {
    return (
      <div className={menu_small}>
        <MenuSmall content={menu}/>
      </div>
    )
  }
}
