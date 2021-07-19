import React from "react";

import "../css/footer.css";

export function Footer() {
  return (
    <>
      <footer
      // style={{
      //   marginTop: `2rem`,
      // }}
      >
        © {new Date().getFullYear()}, Knupel
        {` `}
        <a href="https://www.instagram.com/knupel_art/" target="_blank">
          Instagram
        </a>{" "}
        <a href="https://github.com/StanLepunK" target="_blank">
          {" "}
          Github
        </a>
      </footer>
    </>
  );
}
