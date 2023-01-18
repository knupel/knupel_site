// REACT
import React from "react";
import { Fragment, useContext, useState } from "react";
// GATSBY
import { navigate } from "gatsby";

// app
import { set_label } from "../../../utils/utils";
import { ContextMenu } from "./../../../context/context_menu";



import {  toggle_menu, 
          menu_display, menu_display_open, menu_elem,
          hamburger, burger, hamburger_container,
        } from "./menu_small.module.css";
/* inspired from
* https://github.com/aru120/hamburgerNav-demo/blob/main/components/Hamburger.js
* https://ramonak.io/posts/react-context-api-update-from-nested-component
*/
/////////////////
// MAIN FUNCTION
/////////////////

function build_menu_list(menu, list) {
  if (menu !== undefined) {
    menu.map((elem, key) => {  
      if(elem.what === "submenu") {
        // recursive part
        build_menu_list(elem.menu, list);
      } else {
        // add part
        const label = set_label(elem);
        const obj = {
          key: key,
          label: label,
          what: elem.what,
          menu: elem.menu,
          level: elem.level,
        };
        list.push(obj);
      }
    });
  }
  return list;
}

function ButtonLink({elem}) {
    const click = event => {
    event.preventDefault();
    if (typeof elem.what === "string" || elem.what instanceof String) {
      if (elem.what.startsWith("/")) {
        if (elem.what === "/back") {
          navigate(-1);
        } else {
          navigate(elem.what);
        }
      } else if(new RegExp("http").test(elem.what)) {
        window.open(elem.what, "_blank");
      }
    }
  };

  const over = event => {
    event.preventDefault();
  };
  return <div className={menu_elem} onClick={click} onMouseOver={over}>{elem.label}</div>
}



function MenuContent({content, setting}) {
  const res = [];
  content.map((elem, index) => {
    res.push(
      <ButtonLink elem={elem}/>
    );
  });
  return(<>{res}</>)
}

// DISPLAY
///////////
const ShowMenuSmall = ({content, setting}) => {
  const { menu_small_is } = useContext(ContextMenu);
  const style_menu_close = [menu_display].join(" ");
  const style_menu_open = [menu_display, menu_display_open].join(" ");
  return(
    <div>
      <div>{  menu_small_is ? 
              (<div className={style_menu_open}>
                <MenuContent content={content} setting={setting}/>
               </div>) :
              (<div className={style_menu_close}>
                {/* <MenuContent className={offset_text} menu={menu} setting={setting}/> */}
              </div>)
            }</div>
    </div>
  )
}





// BUTTON TO DISPLAY MENU SMALL
//////////////////////////////

const ToggleMenuSmall = () => {
  const { menu_small_is, swap_menu_small } = useContext(ContextMenu);
  return (
    <button className={toggle_menu} onClick={swap_menu_small}>
      <div className={hamburger_container}>
        <div className={hamburger}>
          <div className={[burger, "burger1"].join(" ")} />
          <div className={[burger, "burger2"].join(" ")} />
          <div className={[burger, "burger3"].join(" ")} />
        </div>
        <style>{`
          .burger1 {
              transform: ${ menu_small_is ? 'rotate(45deg)' : 'rotate(0)'};
          }
          .burger2 {
              opacity: ${ menu_small_is ? 0 : 1};
          }
          .burger3 {
              transform: ${ menu_small_is ? 'rotate(-45deg)' : 'rotate(0)'};
          }
        `}</style> 
      </div>
    </button>
  );
};



const MenuSmallRendering = ({menu, setting}) => {
  const [list, set_list] = useState(null);
  if(list === null) {
    let buf = [];
    buf = build_menu_list(menu, buf)
    set_list(buf);
  }



  return (
    <Fragment>
      <ToggleMenuSmall/>
      <ShowMenuSmall content={list} setting={setting}/>
    </Fragment>
  )
}

export function MenuSmall({content}) {
  return (
    <MenuSmallRendering menu={content.global.menu} setting={content.global.setting}/>  
  )
}




