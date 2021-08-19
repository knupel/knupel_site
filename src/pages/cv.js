import React from "react";
import { Layout } from "../components/layout";
import { get_lang } from "../utils/misc";

import { graphql, useStaticQuery } from "gatsby";
import "../css/about.css";

function DisplaySelectedMD({ node, title }) {
  if (node.frontmatter.title.includes(title)) {
    return (
      <div className="global" dangerouslySetInnerHTML={{ __html: node.html }} />
    );
  } else return null;
}

function DisplayMD() {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/cv/" } }) {
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

  // const lang = "cv " + get_lang();
  const lang = `cv ${get_lang()}`;

  return (
    <div>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <DisplaySelectedMD node={node} title={lang} />
      ))}
    </div>
  );
}

export default function CV({ data }) {
  return (
    <>
      <Layout>
        <DisplayMD />
      </Layout>
    </>
  );
}
