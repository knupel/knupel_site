import React from "react";
import { Layout } from "../components/layout";
import { graphql } from "gatsby";
import "../css/about.css";

export default function About({ data }) {
  return (
    <>
      {/* <h2 style={{ color: "cyan" }}>
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </h2> */}
      <Layout>
        {/* <div>{data.markdownRemark.frontmatter.author}</div> */}
        <div
          className="global"
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
      </Layout>
    </>
  );
}

export const query = graphql`
  query IndexPageQuery {
    markdownRemark(fileAbsolutePath: { regex: "/about_fr.md/" }) {
      html
      frontmatter {
        author
        date
        title
      }
    }
  }
`;
