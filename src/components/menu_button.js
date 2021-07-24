// REACT
import React from "react";
import { useState, useContext } from "react";
// GATSBY
import { navigate } from "gatsby";
// PROCESSING
import { button } from "../processing/button";
import { P5DispatchContext, P5StateContext } from "./P5Manager";
import { Menu } from "./menu";
// MENU
import { MenuContext } from "./menu";
import { ButtonContext } from "./menu";

export function MenuButton(props) {
  // context button
  const { index, active_index, set_active_index } = useContext(MenuContext);
  let { available } = useContext(ButtonContext);
  // context procesing
  const dispatch = useContext(P5DispatchContext);
  //sketch data
  let buf_data = {
    title: props.label,
  };

  const what_can_i_do = event => {
    event.preventDefault();

    if (typeof props.what === "string" || props.what instanceof String) {
      // selected
      if (available) {
        set_active_index(index);
      }
      // rest
      if (props.what.startsWith("/")) {
        if (props.what === "/back") {
          navigate(-1);
        } else {
          navigate(props.what);
        }
      } else if (props.what.startsWith("submenu")) {
        if (props.what === "submenu") {
          // console.log("props.what", props.what);
          // console.log("props.menu", props.menu);
          // return (
          //   <header>
          //     <Menu content={props.menu} />
          //   </header>
          // );
        }
      }
    }
  };

  return (
    <div onClick={what_can_i_do}>
      <props.comp sketch={button} data={buf_data}></props.comp>
    </div>
  );
}
