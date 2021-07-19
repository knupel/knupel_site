import * as React from "react";

import { Layout } from "../components/layout";
import { Form } from "../components/form";

import "../css/contact.css";

// markup
const Contact = () => {
  return (
    <Layout>
      <div className="container">
        <div>Nous conctater, c'est par ici !</div>
        <Form name="contact">
          Un petit message pour expliquer pourquoi, comment... et au diable le
          reste.
        </Form>
      </div>
    </Layout>
  );
};

export default Contact;
