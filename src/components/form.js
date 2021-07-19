import * as React from "react";

import "../css/form.css";
// https://www.gatsbyjs.com/docs/building-a-contact-form/

// Il y a un gestionnaire de pourriel sur Netlify
// Les formulaires sont à récuprer sur le site de netlify dans le compte correspondant au site.
// https://docs.netlify.com/forms/setup/
// https: www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/#form-handling-with-static-site-generators
export function Form({ name, children }) {
  return (
    <form name={name} method="POST" data-netlify="true">
      <input type="hidden" name="form-name" value={name} />
      <div>
        <label>
          <input type="text" name="first name" placeHolder="prénom" />
        </label>
      </div>
      <div>
        <label>
          <input type="text" name="family name" placeHolder="nom" />
        </label>
      </div>
      <div>
        <label>
          <input type="email" name="email" placeHolder="courriel" />
        </label>
      </div>
      <div>
        <label>
          <textarea name="message" placeHolder={children}></textarea>
        </label>
      </div>
      <div className="elem">
        <button type="submit">Envoyer</button>
      </div>
    </form>
  );
}
