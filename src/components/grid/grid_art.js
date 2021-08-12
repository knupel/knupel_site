import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

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
                gatsbyImageData(width: 800, height: 800)
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
          <GatsbyImage image={getImage(node)} />
        ))}
      </div>
    </div>
  );
}
