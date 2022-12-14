import * as React from "react";

import { Layout } from "../components/struct/layout";
import { GridArt } from "../components/grid/grid_art";

// markup
const Art = () => {
  return (
    <Layout>
      <div>
        <GridArt />
      </div>
    </Layout>
  );
};

export default Art;
