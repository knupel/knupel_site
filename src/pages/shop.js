import * as React from "react";

import { Layout } from "../components/layout";
import { Form } from "../components/form";

import "../css/shop.css";
// https://www.gatsbyjs.com/tutorial/ecommerce-tutorial/#example-2-import-skus-via-source-plugin
// https://www.gatsbyjs.com/plugins/gatsby-source-stripe/
// example shop https://gatsby-ecommerce-stripe.netlify.app/
const Shop = () => {
  return (
    <Layout>
      <h1>La Boutique is on the road, come back in 2024</h1>
      <div className="container">
        <div>Or Contact me... </div>
        <Form name="shop">
          ...to explain your incredible desire to buy something awesome from me
          !!
        </Form>
      </div>
    </Layout>
  );
};

export default Shop;
