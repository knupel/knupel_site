import React from "react";
import { useState } from "react";
// Processing
import P5Manager from "./P5Manager";
import P5Wrapper from "./P5Wrapper";
import { MenuButton } from "./menu_button";

const menu_style = size => {
  return {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fill, minmax(${size}px, 1fr))`,
  };
};

// transform, parse object list to REACT COMPONENT
function MenuElem({ list }) {
  const res = [];
  list.map(elem =>
    res.push(
      <MenuButton comp={elem.comp} label={elem.label} what={elem.what} />
    )
  );
  return <>{res}</>;
}

export function Menu({ content }) {
  const names = ["0", "1", "2"];
  const [button, set_button] = useState([]);

  // SET MENU
  if (button.length === 0) {
    content.menu.map(elem => {
      const obj = {
        comp: P5Wrapper(elem.name),
        label: elem.label,
        what: elem.what,
      };
      button.push(obj);
      set_button(button);
    });
  }

  // DISPLAY
  return (
    <div>
      <P5Manager>
        <div style={menu_style(100)}>
          <MenuElem list={button} />
        </div>
      </P5Manager>
    </div>
  );
}
