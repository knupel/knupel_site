/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import PropTypes from "prop-types";

import { useStaticQuery, graphql } from "gatsby";

// import { useState } from "react";
// import { createContext } from "react";

import Header from "./header";
import { Footer } from "./footer";
import "../css/layout.css";

export function Layout({ children }) {
  // const [lang, set_lang] = useState("fr");

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
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main style={{ marginTop: 0 }}>{children}</main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
