import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const img_grid_style = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
};

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
          <GatsbyImage image={getImage(node)} alt={node.base} />
        ))}
      </div>
    </div>
  );
}

// import React from "react";
// import { useStaticQuery, graphql } from "gatsby";

// import { GridGraphicDesign } from "./grid_graphic_design";
// import { GridPhoto } from "./grid_photo";
// import { GridArt } from "./grid_art";

// const img_grid_style = {
//   position: "relative",
//   display: "grid",
//   gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
// };

// export function GridAll() {
//   return (
//     <div>
//       <GridArt />
//       <GridGraphicDesign />
//       <GridPhoto />
//     </div>
//   );
// }
