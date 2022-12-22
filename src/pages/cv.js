import React from "react";
// app
import { Layout } from "../components/struct/layout";
import { get_lang } from "../utils/utils";
import "../css/about.css";
// gatsby
import { graphql, useStaticQuery } from "gatsby";

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
