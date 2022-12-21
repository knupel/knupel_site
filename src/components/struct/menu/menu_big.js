import React from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
// app
import { set_label, set_width } from "../../../utils/misc";
// Processing
import P5Manager from "../../processing/P5Manager";
import P5Wrapper from "../../processing/P5Wrapper";
import { MenuButtonProcessing } from "./menu_button_processing";

// https://www.robinwieruch.de/react-usecontext-hook
// https://reactjs.org/docs/hooks-reference.html#usecontext

// context
export const ContextMenuBig = createContext(null);
export const ContextMenuButton = createContext(null);


// transform, parse object list to REACT COMPONENT
function MenuElem({ list, active_index, set_active_index }) {
  // results
  const res = [];
  list.map((elem, index) => {
    // define if submenu is available
    let available = elem.menu === undefined ? false : true;
    res.push(
      <ContextMenuBig.Provider
        key={index}
        value={{ index, active_index, set_active_index }}
      >
        <ContextMenuButton.Provider value={{ available }}>
          <div style={{height: elem.height}}>
            <MenuButtonProcessing
              index={index}
              comp={elem.comp}
              label={elem.label}
              font_size={elem.font_size}
              font_color={elem.font_color}
              what={elem.what}
              menu={elem.menu}
              width={elem.width}
              height={elem.height}
            />
         </div>
        </ContextMenuButton.Provider>
      </ContextMenuBig.Provider>
    );
  });
  return <>{res}</>;
}

function MenuSub({ menu, setting, height }) {
  const { index, active_index } = useContext(ContextMenuBig);
  if (index === active_index && menu !== undefined && setting !== undefined) {
    // here we make a recursive loop to go deeper in the tree menu
    return <MenuBigBuild menu={menu.menu} setting={setting} height={height}/>;
  } else {
    return <div></div>;
  }
}

function MenuDeploy({ list, setting,height, active_index, set_active_index }) {
  const res = [];
  list.map((elem, index) => {
    res.push(
      <ContextMenuBig.Provider
        key={index}
        value={{ index, active_index, set_active_index }}
      >
        <MenuSub menu={elem} setting={setting} height={height}/>
      </ContextMenuBig.Provider>
    );
  });
  return <>{res}</>;
}


//////////////////
// ANNEXE
///////////////////

//////////////
// STYLE
///////////////
const menu_grid_style = (button_list) => {
  const res = {display: "flex"};
  button_list.map(elem => {
    if(elem.level === 0) {
      res.backgroundColor = "yellow";
    } else {
      res.backgroundColor = "magenta";
    }
  });
  return res;
};


/////////////////
// MAIN FUNCTION
/////////////////

function MenuBigBuild({ menu, setting, height }) {
  const [button, set_button] = useState([]);
  const [active_index, set_active_index] = useState(-1);
  // SET MENU
  if (button.length === 0 && menu !== undefined && setting !== undefined) {
    menu.map(elem => {
      const label = set_label(elem);
      let width = set_width(label, setting);
      const obj = {
        comp: P5Wrapper(elem.name),
        label: label,
        font_size: setting.font_size,
        font_color: setting.font_color,
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
          height={height}
          active_index={active_index}
          set_active_index={set_active_index}
        />
      </P5Manager>
    </div>
  );
}

export function MenuBig({ content }) {
  let height_bar = content.global.setting.font_size * content.global.setting.ratio_height;
  return (
    <MenuBigBuild menu={content.global.menu} setting={content.global.setting} height={height_bar} />
  );
}
