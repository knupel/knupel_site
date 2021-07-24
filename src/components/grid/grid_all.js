import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { GridGraphicDesign } from "./grid_graphic_design";
import { GridPhoto } from "./grid_photo";
import { GridArt } from "./grid_art";

const img_grid_style = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
};

export function GridAll() {
  return (
    <div>
      <GridArt />
      <GridGraphicDesign />
      <GridPhoto />
    </div>
  );
}
// export function GridAll() {
//   const { allFile } = useStaticQuery(
//     graphql`
//       query {
//         allFile(filter: { sourceInstanceName: { eq: "all_hd" } }) {
//           edges {
//             node {
//               extension
//               relativePath
//               childImageSharp {
//                 fluid(maxWidth: 2000, maxHeight: 2000) {
//                   ...GatsbyImageSharpFluid
//                 }
//               }
//             }
//           }
//         }
//       }
//     `
//   );

//   return (
//     <div>
//       <div style={img_grid_style}>
//         {allFile.edges.map(({ node }) => (
//           <Img fluid={node.childImageSharp.fluid} />
//         ))}
//       </div>
//     </div>
//   );
// }
