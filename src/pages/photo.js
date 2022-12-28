import * as React from "react";

import { Layout } from "../components/struct/layout";

import { Diaporama } from "../components/diaporama/diaporama";

import { useStaticQuery, graphql } from "gatsby";

const Photo = () => {
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(
          filter: {sourceInstanceName: {eq: "all"}, extension: {eq: "jpg"}, dir: {regex: "/photo_hd/"}}
          sort: {base: ASC}
        ) {
          edges {
            node {
              base
              name
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

  const setting = {
    background: "black",
    first_is: true,
    first: "première",
    last_is: false,
    last: "dernière",
    previous_is: true,
    previous: "précédente",
    next_is: true,
    next: "suivante",
  };

  return (
    <Layout>
      <Diaporama allFile={allFile} setting={setting} />
    </Layout>
  );
};

export default Photo;
