import React from "react";

export function SelectMD({ node, title }) {
  if (node.frontmatter.title.includes(title)) {
    return (
      <div className="global" dangerouslySetInnerHTML={{ __html: node.html }} />
    );
  } else return null;
}
