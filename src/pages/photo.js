import * as React from "react";

import { Layout } from "../components/layout";
import { GridPhoto } from "../components/grid/grid_photo";

// markup
const Photo = () => {
  return (
    <Layout>
      <div>
        <GridPhoto />
      </div>
    </Layout>
  );
};

export default Photo;
