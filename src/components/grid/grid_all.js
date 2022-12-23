/**
 * GRID ALL
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
import { ImageZoom } from "../image/image_zoom";


const img_grid_style = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
};

// { regex: "/__/" }
// ^(?=.*\\.(md|txt|MD|TXT)($|\\?)).*
// https://regexr.com/
// +.(jp[e]?g|JP[E]?G))/g

// filter: { sourceInstanceName: { eq: "all" }, base: { regex: "/__/" } }
// filter: { sourceInstanceName: { eq: "all" }, extension: {eq: "jpg"}, base: { regex: "/__/" } }
export function GridAll() {
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(
          filter: { sourceInstanceName: { eq: "all" }, base: { regex: "/__/" } }
          sort: {base: ASC}
        ) {
          edges {
            node {
              name
              extension
              childImageSharp {
                gatsbyImageData(width: 800, height: 800, placeholder: BLURRED)
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
    allFile.edges.map(({ node }, index) => {
      if(node.extension === "jpg") {
        const obj = {
          img: node,
          info: undefined,
        }
        for({node} of allFile.edges) {
          if(node.extension === "md" && obj.img.name === node.name) {
            obj.info = node;
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
      <div>
        <div style={img_grid_style}>
         {list.map((elem) => (
            <ImageZoom elem={elem}/>
          ))}
        </div>
      </div>
    );

  } else return null;
  
}
