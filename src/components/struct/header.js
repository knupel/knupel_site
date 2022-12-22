import React from "react";
import { useContext, useState }  from "react";

// APP
import { MenuBig } from "./menu/menu_big";
import { MenuSmall }  from "./menu/menu_small";
import { Window_is_higher_than } from "./../../utils/canvas";
import { menu_small, menu_big } from "./header.module.css";
import menu from "./../../../media/json/menu.json";
import { ContextMenu } from "./../../context/context_menu.js"
import { get_css_value } from "../../utils/utils.js";






export default function Header() {
  const { switch_off_menu_small } = useContext(ContextMenu);
  const [size, set_size] = useState(undefined);
  if(size === undefined) {
    set_size(get_css_value("--window_min"));
  }
  
  if(Window_is_higher_than(size)) {
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
