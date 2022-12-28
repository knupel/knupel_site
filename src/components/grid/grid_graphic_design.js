/**
 * GRID GRAPHIC DESIGN
 * 2021-2022
 * v 0.1.0
 * 
 */
// REACT
import React from "react";
import { useState } from "react";
// GATSBY
import { useStaticQuery, graphql } from "gatsby";
// APP
import { GridImage } from "./_grid_image"

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
    // first loop to load image file
    let elem_index = 0;
    allFile.edges.map(({ node }, index) => {
      if(node.extension === "jpg") {
        const obj = {
          img: node,
          index:elem_index,
          is_over: false,
        }
        elem_index++;
        for({node} of allFile.edges) {
          if(node.extension === "md" && obj.img.name === node.name) {
            obj.info = node.childrenMarkdownRemark[0];
            break;
          }
        }
        // last
        list.push(obj);
        set_list(list);
      }
    })
  }


  if(list !== null) {
    return (
      <GridImage style={img_grid_style} list={list}/>
    );
  } else return null;
}
