import React from 'react';

export function Header(props) {
  const style = {
    color: `${props.color_text}`,
  };
  return <h1 style={style}>{props.str}</h1>;
}
