// REACT
import React from "react";
import { useContext } from "react";
// GATSBY
import { navigate } from "gatsby";
// PROCESSING
import { button } from "../../../processing/button";
// MENU
import { ContextMenuBig } from "./menu_big";
import { ContextMenuButton } from "./menu_big";

export function MenuButtonProcessing(props) {
  // context button
  const { index, set_active_index } = useContext(ContextMenuBig);
  let { available } = useContext(ContextMenuButton);
  //sketch data
  let buf_data = {
    label: props.label,
    font_size: props.font_size,
    font_color:props.font_color,
    width: props.width,
    height: props.height,
  };


  const click = event => {
    event.preventDefault();
    if (typeof props.what === "string" || props.what instanceof String) {
      if (props.what.startsWith("/")) {
        if (props.what === "/back") {
          navigate(-1);
        } else {
          navigate(props.what);
        }
      } else if(new RegExp("http").test(props.what)) {
        window.open(props.what, "_blank");
      }
    }
  };

  const over = event => {
    event.preventDefault();
    if (typeof props.what === "string" || props.what instanceof String) {
      if (available) {
        set_active_index(index);
      } else {
        set_active_index(-1);
      }
    }
  };
  return (
    <div style={{ cursor: "pointer" }} onClick={click} onMouseOver={over}>
      <props.comp sketch={button} data={buf_data}></props.comp>
    </div>
  );
}
