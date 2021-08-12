import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const img_grid_style = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
};

export function GridArt() {
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(
          filter: { sourceInstanceName: { eq: "art_hd" } }
          sort: { fields: base, order: ASC }
        ) {
          edges {
            node {
              extension
              relativePath
              childImageSharp {
                fluid(maxWidth: 2000, maxHeight: 2000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `
  );
  return (
    <div>
      <div style={img_grid_style}>
        {allFile.edges.map(({ node }) => (
          <Img fluid={node.childImageSharp.fluid} />
        ))}
      </div>
    </div>
  );
}
