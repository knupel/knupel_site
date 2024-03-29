import * as React from "react";

import { Layout } from "../components/struct/layout";
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

export const Head = () => {
	<>
		<title>Contact</title>
		<meta name="author" content="Knupel" />
		<meta name="description" content="Knupel est un artiste codeur. Son travail navigue entre l'art génératif, le graphisme, l'illustration et au développement web" />
	</>
}
