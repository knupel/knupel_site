import React from "react";
import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
// Processing
import P5Manager from "./P5Manager";
import P5Wrapper from "./P5Wrapper";
import { MenuButton } from "./menu_button";

// https://www.robinwieruch.de/react-usecontext-hook
// https://reactjs.org/docs/hooks-reference.html#usecontext

// context
export const MenuContext = createContext(null);
export const ButtonContext = createContext(null);

// transform, parse object list to REACT COMPONENT
function MenuElem({ list, active_index, set_active_index }) {
  // results
  const res = [];
  list.map((elem, index) => {
    // define if submenu is available
    let available = elem.menu === undefined ? false : true;
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
            width={elem.width}
            height={elem.height}
          />
        </ButtonContext.Provider>
      </MenuContext.Provider>
    );
  });
  return <>{res}</>;
}

function MenuSub({ elem }) {
  const { index, active_index } = useContext(MenuContext);
  if (index === active_index && elem.menu !== undefined) {
    // here we make a recursive loop to go deeper in the tree menu
    return <MenuCalc content={elem} />;
  } else {
    return <div></div>;
  }
}

function MenuDeploy({ list, active_index, set_active_index }) {
  const res = [];
  list.map((elem, index) => {
    res.push(
      <MenuContext.Provider
        key={index}
        value={{ index, active_index, set_active_index }}
      >
        <MenuSub elem={elem} />
      </MenuContext.Provider>
    );
  });
  return <>{res}</>;
}

const menu_style = size => {
  return {
    display: "flex",
  };
};

function MenuCalc({ content }) {
  const [button, set_button] = useState([]);
  const [active_index, set_active_index] = useState(-1);

  // SET MENU
  if (button.length === 0 && content.menu !== undefined) {
    content.menu.map(elem => {
      const obj = {
        comp: P5Wrapper(elem.name),
        label: elem.label,
        what: elem.what,
        menu: elem.menu,
        width: elem.width,
        height: elem.height,
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
        <MenuDeploy
          list={button}
          active_index={active_index}
          set_active_index={set_active_index}
        />
      </P5Manager>
    </div>
  );
}

export function Menu({ content }) {
  return <MenuCalc content={content} />;
}
