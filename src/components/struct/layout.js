/**
 * Layout
 * v 0.3.2
 * 2021-2023
 */
// REACT
import * as React from "react";
import { useState, createContext } from "react";
// MISC
import PropTypes from "prop-types";
// GATSBY
import { useStaticQuery, graphql } from "gatsby";
// APP
import Header from "./header";
import { ProviderMenu } from "./../../context/context_menu.js"
import { Footer } from "./footer";
import "./layout.css";
import { get_css_value } from "../../utils/utils";
import { get_width } from "../../utils/canvas";


export const ContextLayout = createContext(null);


export function Layout({ children }) {

  const [height_bar, set_height_bar] = useState("20px");
  const [height_bar_num, set_height_bar_num] = useState(0);
  const [size, set_size] = useState(null);
  // setting
  let width = get_width();
  if(size === null || size !== width) {
    set_size(width);
  }
  
  if(size < get_css_value("--window_min")) {
    if(height_bar !== get_css_value("--height_bar_menu_small")) {
      set_height_bar(get_css_value("--height_bar_menu_small"));
      set_height_bar_num(get_css_value("--font_size_menu_num") * get_css_value("--ratio_menu_small"));
    } 
  } else {
    if(height_bar !== get_css_value("--height_bar_menu_big")) {
      set_height_bar(get_css_value("--height_bar_menu_big"));
      set_height_bar_num(get_css_value("--font_size_menu_num") * get_css_value("--ratio_menu_big"));
    }
  }
  // this solution be used with and it's more usable because you can use value in from one place
  // in global css
  // <div style={{height: height_bar}}></div>

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <ProviderMenu>
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      </ProviderMenu>
      <ContextLayout.Provider value={{height_bar_num}}>
        <div style={{height: height_bar}}></div> 
        {/* we don't use this design pattern because we must put two values one in the layout.css and the same in global.css
        because it's not possible to import global value in css @media (min-width: 780px) */}
        {/* <div className="navbar"></div> */}
        <div style={{ marginTop: 0 }}>{children}</div>
      </ContextLayout.Provider> 
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
