/**
 * GRID ART
 * 2021-2022
 * v 0.2.0
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
export function GridArt() {
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(
          filter: {sourceInstanceName: {eq: "all"}, dir: {regex: "/img_art_hd/"}}
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
