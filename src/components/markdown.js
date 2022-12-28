/**
 * markdown shower
 * 2021-2022
 * v 0.1.0
 * https:// guides.github.com/pdfs/markdown-cheatsheet-online.pdf
 * */

import React from "react";

export function SelectMD({ style, className, node, title }) {
  if (node !== undefined && (node.frontmatter.title.includes(title) || title === undefined)) {
    return (
      <div
        style={style}
        className={className}
        dangerouslySetInnerHTML={{ __html: node.html }}
      />
    );
  } else return null;
}


export function SelectMDFront({ style, className, node}) {
  // console.log(node.frontmatter);
  if (node !== undefined && node.frontmatter!== undefined ) {
    return (
      <div
        style={style}
        className={className}>
        <div className="title">{node.frontmatter.title}</div>
        <div className="subtitle">{node.frontmatter.subtitle}</div>
        <div className="author">{node.frontmatter.author}</div>
        <div className="date">{node.frontmatter.date}</div>
        <div className="type">{node.frontmatter.type}</div>
        <div className="support">{node.frontmatter.client}</div>
        <div className="size">{node.frontmatter.size}</div>
        <div className="serie">{node.frontmatter.serie}</div>
        <div className="id">{node.frontmatter.id}</div>
        <div className="client">{node.frontmatter.client}</div>
        <div className="misc">{node.frontmatter.misc}</div>
        <div className="price">{node.frontmatter.price}</div>
        <div className="format">{node.frontmatter.format}</div>
        
      </div>
      
    );
  } else return null;
}
