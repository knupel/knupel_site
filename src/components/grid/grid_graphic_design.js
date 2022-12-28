/**
 * GRID GRAPHIC DESIGN
 * 2021-2022
 * v 0.1.1
 * 
 */
// REACT
import React from "react";
import { useState } from "react";
// GATSBY
import { useStaticQuery, graphql } from "gatsby";
// APP
import { GridImage, build_list } from "./_grid_image"

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
              name
              extension
              childImageSharp {
                gatsbyImageData(width: 800, height: 800, placeholder: BLURRED)
              }
              childrenMarkdownRemark {
                frontmatter {
                  author
                  title
                  subtitle
                }
                html
              }
            }
          }
        }
      }
    `
  );
  const [list, set_list] = useState([]);
  if(list.length === 0) {
    set_list(build_list(allFile.edges, list));
  }

  if(list !== null) {
    return (
      <GridImage style={img_grid_style} list={list}/>
    );
  } else return null;
}
