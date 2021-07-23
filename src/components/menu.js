import React from "react";
import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
// Processing
import P5Manager from "./P5Manager";
import P5Wrapper from "./P5Wrapper";
import { MenuButton } from "./menu_button";

// https://www.robinwieruch.de/react-usecontext-hook
const menu_style = size => {
  return {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fill, minmax(${size}px, 1fr))`,
  };
};
// context
export const MenuContext = createContext(null);
export const ButtonContext = createContext(null);

// transform, parse object list to REACT COMPONENT
function MenuElem({ list, active_index, set_active_index }) {
  console.log("3 MenuElem", active_index);
  // results
  const res = [];
  let available = true;
  list.map((elem, index) => {
    // console.log("index", index, "active_index", active_index);
    res.push(
      <MenuContext.Provider
        key={index}
        value={{ index, active_index, set_active_index }}
      >
        <ButtonContext.Provider value={{ available }}>
          <MenuButton
            index={index}
            comp={elem.comp}
            label={elem.label}
            what={elem.what}
            menu={elem.menu}
          />
        </ButtonContext.Provider>
      </MenuContext.Provider>
    );
  });
  return <>{res}</>;
}

function MenuSub({ elem }) {
  const { index, active_index } = useContext(MenuContext);
  console.log("4 MenuSub", active_index);
  // console.log("index, active_index", index, active_index);
  if (index === active_index) {
    return <div>{elem.label}</div>;
  } else {
    return <div></div>;
  }
}

function MenuDeploy({ list }) {
  const res = [];
  list.map((elem, index) => {
    res.push(
      <MenuContext.Consumer>
        <MenuSub elem={elem} />
      </MenuContext.Consumer>
    );
  });
  return <>{res}</>;
}

export function Menu({ content }) {
  // console.log(content);
  console.log("0 Menu", new Date().getTime());
  const [button, set_button] = useState([]);
  const [active_index, set_active_index] = useState(-1);
  const [menu_index, set_menu_index] = useState(-1);
  console.log("1 Menu", active_index, new Date().getTime());

  // keep result in memory
  useEffect(() => {
    if (active_index >= 0) {
      set_menu_index(active_index);
      console.log("2 Menu useEffect", active_index);
    }
  }, [active_index]);

  // SET MENU
  if (button.length === 0) {
    content.menu.map(elem => {
      const obj = {
        comp: P5Wrapper(elem.name),
        label: elem.label,
        what: elem.what,
        menu: elem.menu,
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
          <MenuElem
            list={button}
            active_index={active_index}
            set_active_index={set_active_index}
          />
        </div>
        <MenuDeploy list={button} />
      </P5Manager>
    </div>
  );
}
