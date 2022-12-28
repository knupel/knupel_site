/**
 * GRID DYNAMIC
 * 2022-2022
 * v 0.1.0
 * */
import React from "react";
import { useState, createContext, useContext}  from "react";
// APP
import { ImageZoom } from "../image/image_zoom";
import { SelectMDFront } from "./../markdown";
import { ContextLayout} from "./../struct/layout";
import { in_canvas } from "./../../utils/canvas"
// Context
export const ContexGridImage = createContext(null);


function Info({className, style, info}) {
	return <>{info !== null ? <SelectMDFront className={className} style={style} node={info}/> : null}</>
}

// https://stackoverflow.com/questions/67316539/passing-function-through-usecontext
export function GridImage({style, list}) {
	const { height_bar_num } = useContext(ContextLayout);
	const [is_grid_over, set_is_grid_over] = useState(true);
	const [info, set_info] = useState(null);
	const [mouse, set_mouse] = useState({x:-1000,y:-1000});
	// all elements
	const [group, set_group] = useState(list);

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

	const mouse_click = (event, index) => {
		event.preventDefault();

	}

	function over_is(index, pos, canvas, state) {
		if(in_canvas(mouse, pos, canvas) === state) {
			const update_group = [];
			let update_is = false;
			group.map((elem) => {
				if(elem !== undefined && elem.index === index && elem.is_over !== state) {
					elem.is_over = state;
					if(elem.is_over === true) {
						const buf = elem.info;
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

	function show_is(index, pos, canvas) {
		if(in_canvas(mouse, pos, canvas) === true) {
			const update_group = [];
			let update_is = false;
			group.map((elem) => {
				if(elem !== undefined && elem.index === index) {
					elem.is_show = true;
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
		// cursor: 'pointer',
	}



	return (
		<ContexGridImage.Provider value={setting}>
			<div style={style}>
			{list.map((elem, index) => (
					<ImageZoom elem={elem} index={index}/>
				))}
			</div>
			<div onMouseMove={mouse_move} >
				<Info className="info" style={info_style} info={info}/>
			</div>
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
          obj.info = node.childrenMarkdownRemark[0];
          break;
        }
      }
      list.push(obj);
    }
  })
  return list;
}