import React from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
// app
import { get_lang } from "../utils/misc";
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

function MenuSub({ menu, setting }) {
  const { index, active_index } = useContext(MenuContext);
  if (index === active_index && menu !== undefined && setting !== undefined) {
    // here we make a recursive loop to go deeper in the tree menu
    return <MenuCalc menu={menu.menu} setting={setting} />;
  } else {
    return <div></div>;
  }
}

function MenuDeploy({ list, setting, active_index, set_active_index }) {
  const res = [];
  list.map((elem, index) => {
    res.push(
      <MenuContext.Provider
        key={index}
        value={{ index, active_index, set_active_index }}
      >
        <MenuSub menu={elem} setting={setting} />
      </MenuContext.Provider>
    );
  });
  return <>{res}</>;
}


//////////////////
// ANNEXE
///////////////////

function set_label(elem) {
  if (get_lang() === "fr") {
    return elem.label_fr;
  } else {
    return elem.label_en;
  }
}

function set_width(label, setting) {
  if (label !== undefined) {
    let width = label.length * setting.text_size * setting.ratio_width;
    if (width < setting.min_width) return setting.min_width;
    else return width;
  } else return 100;
}

//////////////
// STYLE
///////////////
const menu_grid_style = (button_list) => {
  const res = {display: "flex"};
  button_list.map(elem => {
    if(elem.level === 0) {
      res.backgroundColor = "magenta";
    } else {
      res.backgroundColor = "yellow";
    }
  });
  return res;
};


/////////////////
// MAIN FUNCTION
/////////////////

function MenuCalc({ menu, setting }) {
  const [button, set_button] = useState([]);
  const [active_index, set_active_index] = useState(-1);

  // SET MENU
  if (button.length === 0 && menu !== undefined && setting !== undefined) {
    let height = setting.text_size * setting.ratio_height;
    menu.map(elem => {
      const label = set_label(elem);
      let width = set_width(label, setting);
      const obj = {
        comp: P5Wrapper(elem.name),
        label: label,
        what: elem.what,
        menu: elem.menu,
        width: width,
        height: height,
        level: elem.level,
      };
      button.push(obj);
      set_button(button);
    });
  }

  // DISPLAY
  return (
    <div>
      <P5Manager>
        <div style={menu_grid_style(button)}>
          <MenuElem
            list={button}
            active_index={active_index}
            set_active_index={set_active_index}
          />
        </div>
        <MenuDeploy
          list={button}
          setting={setting}
          active_index={active_index}
          set_active_index={set_active_index}
        />
      </P5Manager>
    </div>
  );
}

export function Menu({ content }) {
  return (
    <MenuCalc menu={content.global.menu} setting={content.global.setting} />
  );
}
