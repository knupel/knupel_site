import * as React from "react";

import { Layout } from "../components/struct/layout";
import { GridGraphicDesign } from "../components/grid/grid_graphic_design";

// markup
const GraphicDesign = () => {
  return (
    <Layout>
      <div>
        <GridGraphicDesign />
      </div>
    </Layout>
  );
};

export default GraphicDesign;


export const Head = () => {
	<>
		<title>Graphisme</title>
		<meta name="author" content="Knupel" />
		<meta name="description" content="Knupel est un artiste codeur. Son travail navigue entre l'art génératif, le graphisme, l'illustration et au développement web" />
	</>
}