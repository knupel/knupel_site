import * as React from "react";

import { Layout } from "../components/layout";
import { GridPhoto } from "../components/grid/grid_photo";

import { Diaporama } from "../components/diaporama";

import { useStaticQuery, graphql } from "gatsby";

// import "bootstrap/dist/css/bootstrap.min.css";
// import Carousel from "react-bootstrap/Carousel";
// import { GatsbyImage, getImage } from "gatsby-plugin-image";

// function Diaporama({ allFile, background }) {
//   return (
//     <div style={{ background: background }}>
//       <Carousel fade>
//         {allFile.edges.map(({ node }) => (
//           <Carousel.Item key={node.id}>
//             <GatsbyImage image={getImage(node)} alt={node.base} />
//           </Carousel.Item>
//         ))}
//       </Carousel>
//     </div>
//   );
// }

const Photo = () => {
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(
          filter: { sourceInstanceName: { eq: "photo_hd" } }
          sort: { fields: base, order: ASC }
        ) {
          edges {
            node {
              id
              base
              extension
              relativePath
              childImageSharp {
                gatsbyImageData(
                  width: 800
                  height: 500
                  placeholder: BLURRED
                  quality: 90
                  blurredOptions: { width: 100 }
                  transformOptions: { cropFocus: CENTER, fit: CONTAIN }
                )
              }
            }
          }
        }
      }
    `
  );

  return (
    <Layout>
      <Diaporama allFile={allFile} background="black" />

      {/* <div>
        <GridPhoto />
      </div> */}
    </Layout>
  );
};

export default Photo;
