/**
 * GRID GRAPHIC DESIGN
 * 2021-2022
 * v 0.1.0
 * 
 */
import React from "react";
import { useStaticQuery, graphql } from "gatsby";
// APP
import ImageZoom from "./grid_image_zoom";

const img_grid_style = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
};

export function GridGraphicDesign() {
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(
          filter: {sourceInstanceName: {eq: "all"}, dir: {regex: "/graphic_design_hd/"}}
          sort: {base: ASC}
        ) {
          edges {
            node {
              id
              base
              extension
              relativePath
              childImageSharp {
                gatsbyImageData(width: 800, height: 800, placeholder: BLURRED)
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
          <ImageZoom node={node}/>
        ))}
      </div>
    </div>
  );
}
