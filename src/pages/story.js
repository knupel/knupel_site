import React from "react";
// gatsby
import { graphql, useStaticQuery } from "gatsby";
// app
import { Layout } from "../components/struct/layout";
import { SelectMD } from "../components/markdown";
import { get_lang } from "../utils/misc";
import "../css/about.css";

function DisplayMD() {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/story/" } }) {
        edges {
          node {
            id
            html
            frontmatter {
              title
              author
              date
            }
          }
        }
      }
    }
  `);
  const lang = `story ${get_lang()}`;

  return (
    <div>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <SelectMD className="global" node={node} title={lang} />
      ))}
    </div>
  );
}

export default function Story() {
  return (
    <>
      <Layout>
        <DisplayMD />
      </Layout>
    </>
  );
}
