/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
// GATSBY
import { useStaticQuery, graphql } from "gatsby";



import Header from "./header";
import { ProviderMenu } from "./../../context/context_menu.js"
import { Footer } from "./footer";
import "./layout.css";

import { get_css_value } from "../../utils/utils.js";
import { GetWidth } from "../../utils/canvas.js";








export function Layout({ children }) {
  const [height_bar, set_height_bar] = useState("20px");
  const [size, set_size] = useState(null);
  // setting
  let width = GetWidth();
  if(size === null || size !== width) {
    set_size(width);
  }
  
  if(size < get_css_value("--window_min")) {
    if(height_bar !== get_css_value("--height_bar_menu_small")) {
      set_height_bar(get_css_value("--height_bar_menu_small"));
    } 
  } else {
    if(height_bar !== get_css_value("--height_bar_menu_big")) {
      set_height_bar(get_css_value("--height_bar_menu_big"));
    }
  }



  // console.log("height", height_bar);

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);


  // let value = getComputedStyle(document.documentElement).getPropertyValue("--height_header");



  return (
    <>
      <ProviderMenu>
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      </ProviderMenu>
      <div style={{height: height_bar}}></div>
      <main style={{ marginTop: 0 }}>{children}</main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
