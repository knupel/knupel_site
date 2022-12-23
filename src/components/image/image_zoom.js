/**
 * IMAGE GRID ZOOM
 * 2022-2022
 * v 0.0.1
 * 
 */
import React from "react";
import { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { ContextLayout} from "./../struct/layout";



function ImageAnimation({img}) {
	const { height_bar_num } = useContext(ContextLayout);
	const [is_over, set_is_over] = useState(false);
	const [mouse, set_mouse] = useState({x:0,y:0});
	// const [mouse_x, set_mouse_x] = useState(0);
	// const [mouse_y, set_mouse_y] = useState(0);
	// const mouse_y = useRef(0);

	const mouse_enter = () => {
		set_is_over(true);
	};

	const mouse_leave = () => {
		set_is_over(false);
	};

	const mouse_move = (event) => {
		// let buf = {x :event.pageX, y :event.pageY};
		let buf = {x :event.pageX, y :event.pageY - height_bar_num};
		set_mouse(buf);
		// set_mouse((prev) => prev.y - height_bar_num);
		// set_mouse_x(event.pageX);
		// let value = event.pageY - height_bar_num;
		// // let value = event.pageY;
		// console.log("value", value);
		// set_mouse_y(value);
		// console.log("mouse_y",mouse_y);
	};
	
	// useEffect((event) => {
	// 	// const mouse_move = (event) => {
	// 		let buf = {x :event.pageX, y :event.pageY - height_bar_num};
	// 		set_mouse(buf);
	// 	// }
	// },[mouse_move]);

	const image_style = {
		transition: 'transform 3s ease, filter 1s ease-in-out',
		transform: is_over ? 'scale(1.5)' : 'scale(1.0)',
		cursor: 'pointer',
	};

	// console.log("height_bar", height_bar_num);

	const info_style = {
		zIndex: "999px",
		position: 'absolute',
		height: '20px',
		width: '20px',
		background: 'yellow',
		opacity: is_over ? 1 : 0,

		// left: mouse.current.x,
		// top:  mouse.current.y,
		left: mouse.x,
		top:  mouse.y,
		// left: mouse_x,
		// top:  mouse_y,
		// top: mouse.y,
		// top: "calc(" + mouse.y + "px" -height_bar_num +")",
		// top:  mouse.y -height_bar_num,
		// top:  mouse.y,
		// top: mouse.y - height_bar,
		// top: mouse.y - height_bar +"px",
	}

	const container_style = {
		overflow: 'hidden',
	};

	return (
		<div style={container_style}>
			<div style={image_style} 
					onMouseEnter={mouse_enter}
					onMouseLeave={mouse_leave}
					onMouseMove={mouse_move}>
				<GatsbyImage image={getImage(img)} alt={img.base}/>
			</div>
			<div style={info_style} ></div>
		</div>
	)
}






export function ImageZoom ({elem}) {
	// console.log("image", elem.img.name, elem.img.extension);
	// if(elem.info === undefined) {
	// 	console.log("info", elem.info);
	// } else {
	// 	console.log("image", elem.img.name, elem.img.extension);
	// 	console.log("info", elem.info.name, elem.info.extension);
	// }
	if(elem.info === undefined) {
		return (
			<>
				{(elem.img.extension === "jpg") ? <ImageAnimation img={elem.img}/> : null}
			</>
		)

	} else {
		return (
			<>
				{(elem.img.extension === "jpg") ? <ImageAnimation img={elem.img} info={elem.info}/> : null}
			</>
		)
	}
	
}