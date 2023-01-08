import * as React from "react";

import { Layout } from "../components/struct/layout";
import { GridDrawing } from "../components/grid/grid_drawing";

// markup
const Drawing = () => {
  return (
    <Layout>
      <div>
        <GridDrawing />
      </div>
    </Layout>
  );
};

export default Drawing;


export const Head = () => {
	<>
		<title>Illustrations / dessins</title>
		<meta name="author" content="Knupel" />
		<meta name="description" content="Knupel est un artiste codeur. Son travail navigue entre l'art génératif, le graphisme, l'illustration et au développement web" />
	</>
}