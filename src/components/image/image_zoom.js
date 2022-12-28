/**
 * IMAGE GRID ZOOM
 * 2022-2022
 * v 0.2.0
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




// import useMouse from '@react-hook/mouse-position'
// https://github.com/jaredLunde/react-hook/blob/master/packages/mouse-position/src/index.tsx
// https://www.kindacode.com/article/react-get-the-position-x-y-of-an-element/
// https://stackoverflow.com/questions/62483460/mouse-element-movement-within-a-react-div
// function ImageAnimation({img, info}) {
function ImageAnimation2({elem, index}) {
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

			
	const { mouse_enter, mouse_leave, mouse_move, mouse} = useContext(ContexGridImage);
	
	// image style
	const img_box_style = {
		// zIndex: "10px",
		overflow: 'hidden',
	};

	const img_style = {
		transition: 'transform 3s ease, filter 1s ease-in-out',
		transform: elem.is_over ? 'scale(1.5)' : 'scale(1.0)',
		cursor: 'pointer',
	};

	// info style
	const info_box_style = {
		// zIndex: "999px",
		// overflow: 'visible',
	};

	const info_style = {
		// zIndex: "999px", // not necessary
		position: 'absolute',
		opacity:  elem.is_over ? 1 : 0, 
		left: mouse.x,
		top: mouse.y,
		// cursor: 'pointer',
		// overflow: is_over ? 'visible' : "hidden",
	}



	return (
		<>
			{/* image + animation */}
			<div style={img_box_style}>
				<div ref={ref} style={img_style} 
						onMouseEnter={mouse_enter(index, pos, canvas)}
						// onMouseLeave={mouse_leave}
						onMouseLeave={mouse_leave(index, pos, canvas)}
						onMouseMove={mouse_move}
						>
					<GatsbyImage image={getImage(elem.img)} alt={elem.img.base}/>
				</div>
			</div>
			{/* info */}
			{/* <div style={info_box_style} onMouseMove={mouse_move} onMouseEnter={mouse_enter_info}>
				<Info className="info" style={info_style} info={elem.info}/>
			</div> */}
		</>
	)
}








export function ImageZoom ({elem, index}) {

	if(elem !== null && elem !== "undefined" && elem !== undefined) {
		return (
			<div>
				{(elem.img.extension === "jpg") ? <ImageAnimation2 elem={elem} index={index}/> : null}
				{/* {(elem.img.extension === "jpg") ? <ImageAnimation elem={elem}/> : null} */}
			</div>
		)
	} return null;
}




