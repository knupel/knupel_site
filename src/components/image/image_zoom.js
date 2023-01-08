/**
 * IMAGE ZOOM
 * 2022-2022
 * v 0.2.1
 * 
 * use with image component GridImage to animate the image from the grid
 * 
 */
import React from "react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useContext } from "react";
// GATSBY
import { GatsbyImage, getImage } from "gatsby-plugin-image";
// APP
import { SelectMDFront } from "./../markdown";
import { ContexGridImage} from "./../grid/_grid_image";


import "./image_zoom.scss";


function Info({className, style, info}) {
	return <>{info !== undefined ? <SelectMDFront className={className} style={style} node={info}/> : null}</>
}


function ImageAnimation({elem, index}) {
	// div pos
	const ref = useRef(null);
	const [pos, set_pos] = useState({x:0,y:0});
	const [canvas, set_canvas] = useState({width:0, height:0});

	const get_canvas = () => {
		if(ref.current !== null) {
			let x = ref.current.offsetLeft;
			let y = ref.current.offsetTop;
			let w = ref.current.getBoundingClientRect().width;
			let h = ref.current.getBoundingClientRect().height;
			set_pos({x: x, y: y});
			set_canvas({width: w, height: h});
		}
	};

	useEffect(() => {
		get_canvas();
	}, []);

	useEffect(() => {
	window.addEventListener("resize", get_canvas);
	}, []);

	// CONTEXT
	/////////////////
	const { mouse_enter, mouse_leave, mouse_move} = useContext(ContexGridImage);
	
	// image style
	const img_box_style = {
		overflow: 'hidden',
	};

	const img_style = {
		transition: 'transform 3s ease, filter 1s ease-in-out',
		transform: elem.is_over ? 'scale(1.5)' : 'scale(1.0)',
		cursor: 'pointer',
	};

	return (
		<>
			<div style={img_box_style}>
				<div ref={ref} style={img_style} 
						onMouseEnter={mouse_enter(index, pos, canvas)}
						onMouseLeave={mouse_leave(index, pos, canvas)}
						onMouseMove={mouse_move}
						>
					<GatsbyImage image={getImage(elem.img)} alt={elem.img.name}/>
				</div>
			</div>
		</>
	)
}






// https://reactgo.com/react-pass-event-with-parameter/
// https://www.geeksforgeeks.org/how-to-pass-a-parameter-to-an-event-handler-or-callback/

export function ImageZoom ({elem, index}) {
	const { mouse_click } = useContext(ContexGridImage);

	if(elem !== null && elem !== "undefined" && elem !== undefined) {
		return (
			<div onClick={(event) => mouse_click(event, index)}>
				{(elem.img.extension === "jpg") ? <ImageAnimation elem={elem} index={index}/> : null}
			</div>
		)
	} return null;
}




