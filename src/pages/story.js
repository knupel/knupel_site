import React from "react";
// gatsby
import { graphql, useStaticQuery } from "gatsby";
// app
import { Layout } from "../components/struct/layout";
import { SelectMD } from "../components/markdown";
import { get_lang } from "../utils/utils";
import "../css/about.css";

function DisplayMD() {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/story/" } }) {
        edges {
          node {
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



export const Head = () => {
	<>
		<title>bio</title>
		<meta name="author" content="Knupel" />
		<meta name="description" content="Knupel est un artiste codeur. Son travail navigue entre l'art génératif, le graphisme, l'illustration et au développement web" />
	</>
}