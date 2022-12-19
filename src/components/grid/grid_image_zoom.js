/**
 * IMAGE GRID ZOOM
 * 2022-2022
 * v 0.0.1
 * 
 */
import React from "react";
import { useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function ImageZoom ({node}) {
	const [is_over, set_is_over] = useState(false);

	const mouse_enter = () => {
		set_is_over(true);
	};

	const mouse_leave = () => {
		set_is_over(false);
	};

	const container_style = {
		overflow: 'hidden',
	};

	const image_style = {
		transition: 'transform 3s ease, filter 1s ease-in-out',
		transform: is_over ? 'scale(1.5)' : 'scale(1.0)',
		cursor: 'pointer',
	};

	return (
		<>
			<div style={container_style}>
				<div style={image_style} 
						onMouseEnter={mouse_enter}
						onMouseLeave={mouse_leave}>
					<GatsbyImage image={getImage(node)} alt={node.base}/>
				</div>
			</div>
		</>
	)
}