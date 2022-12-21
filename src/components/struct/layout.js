/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import PropTypes from "prop-types";

import { useStaticQuery, graphql } from "gatsby";


import Header from "./header";
import { ProviderMenu } from "./../../context/context_menu.js"
import { Footer } from "./footer";
import "./layout.css";








export function Layout({ children }) {
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
      <main style={{ marginTop: 0 }}>{children}</main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
