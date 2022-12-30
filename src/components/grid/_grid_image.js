/**
 * GRID DYNAMIC
 * 2022-2022
 * v 0.1.0
 * */
import React from "react";
import { useState, createContext, useContext}  from "react";
// GATSBY
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { StaticImage } from "gatsby-plugin-image";
// APP
import { ImageZoom } from "../image/image_zoom";
import { SelectMDFront } from "./../markdown";
import { ContextLayout} from "./../struct/layout";
import { in_canvas } from "./../../utils/canvas"
// SCSS
import "./_grid_image.scss";
// Context
export const ContexGridImage = createContext(null);











// BUBBLE INFO
////////////////////////
function Info({className, style, info}) {
	return <>{info !== null ? <SelectMDFront className={className} style={style} node={info}/> : null}</>
}










// FULL IMAGE
////////////////
function FullImage({list, index}) {
	const { mouse_click } = useContext(ContexGridImage);
	const container= {
		display: index > 0 ? "flex": "none",
		justifyContent: "center",
		alignItems: "center",
		background: "black",
		width: "100%",
		height: "100%",
		// position :"absolute",


	}


	let img_target = null;
	if(index >= 0 && index < list.length) {
		img_target = list[index];
	}
	if(img_target) console.log("FullImage({list, index})",index, img_target.img.name);
	return(
		<div style={container} onClick={(event) => mouse_click(event, -1)}>
			<div>
				{img_target !== null ? <GatsbyImage image={getImage(img_target.img)} alt={img_target.img.name}/> : null}
				
				{/* <StaticImage src={img.path} alt={img.name}/> */}
			</div>
		</div>
	)
}







// THE GRID
///////////////////
// https://stackoverflow.com/questions/67316539/passing-function-through-usecontext
export function GridImage({style, list}) {
	const { height_bar_num } = useContext(ContextLayout);
	const [is_grid_over, set_is_grid_over] = useState(true);
	const [info, set_info] = useState(null);
	const [mouse, set_mouse] = useState({x:-1000,y:-1000});
	// all elements
	const [group, set_group] = useState(list);
	const [index_open, set_index_open] = useState(-1);

	// context function
	const mouse_move = (event) => {
		event.preventDefault();
		let buf_x = event.pageX;
		let buf_y = event.pageY - height_bar_num;
		set_mouse({x : buf_x, y : buf_y});
	};

	const mouse_leave = (index, pos, canvas) => {
		over_is(index, pos, canvas, false);
	};

	const mouse_enter = (index, pos, canvas) => {
		over_is(index, pos, canvas, true);
	};

	// https://www.geeksforgeeks.org/how-to-pass-a-parameter-to-an-event-handler-or-callback/
	// there is special syntax to pass and receive parameter and event
	// <div onClick={(event) => mouse_click(event, index)}><div>
	const mouse_click = (event, index) => {
		event.preventDefault();
		set_index_open(index);
	}

	function over_is(index, pos, canvas, state) {
		if(in_canvas(mouse, pos, canvas) === state) {
			const update_group = [];
			let update_is = false;
			group.map((elem) => {
				if(elem !== undefined && elem.index === index && elem.is_over !== state) {
					elem.is_over = state;
					if(elem.is_over === true) {
						const buf = {
							text: elem.text,
							index: elem.index,}
						set_info(buf);
					}
					update_is = true;
				}
				update_group.push(elem);
			});
			if(update_is) {
				set_group(update_group);
			}
		}
	}

	const setting = {
		mouse,
		group,
		mouse_move,
		mouse_enter,
		mouse_leave,
		mouse_click,
		set_group,
	};

	// info part
	const info_style = {
		position: 'absolute',
		opacity: is_grid_over ? 1 : 0, // need to have a good start, but not refresh when it's outside the div
		left: mouse.x,
		top: mouse.y,
		cursor: 'pointer',
	}

	return (

		<ContexGridImage.Provider value={setting}>
		{index_open >= 0 ? 
			<FullImage list={list} index={index_open} /> :
			<>
				<div style={style}>
				{list.map((elem, index) => (
						<ImageZoom elem={elem} index={index}/>
					))}
				</div>
				{info !== null ? 
					<div onMouseMove={mouse_move} onClick={(event) => mouse_click(event, info.index)}>
						<Info className="info" style={info_style} info={info.text}/>
					</div> : 
					null}
			</>
		}
	</ContexGridImage.Provider>
	)
}







export function build_list(edges, list) {
  let elem_index = 0;
  edges.map(({ node }) => {
    if(node.extension === "jpg") {
      const obj = {
        img: node,
        index:elem_index,
        is_over: false,
        is_show:false,
      }
      elem_index++;
      for({node} of edges) {
        if(node.extension === "md" && obj.img.name === node.name) {
          obj.text = node.childrenMarkdownRemark[0];
          break;
        }
      }
      list.push(obj);
    }
  })
  return list;
}