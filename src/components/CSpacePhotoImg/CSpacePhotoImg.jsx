import React from 'react';
import { Link } from 'react-router-dom';
import CSpacePhoto from '../CSpacePhoto/CSpacePhoto';
import './CSpacePhotoImg.css';

const Img = (props) => {
	// on img els, remove non-img attributes
	if (props.caption) {
		return (
			<div className="CSpacePhotoImg">
				<img
					className={props.className}
					height={props.height}
					width={props.height}
					style={props.style}
					src={props.src}
					onLoad={props.onLoad}
					onError={props.onError}
					children={props.children}
				/>
				<div className={props.fadedCaption ? 'faded caption' : 'caption'}>
						Film: <Link to={props.captionLink}>
							<em>{props.caption}</em>
						</Link>
					</div>
			</div>
		);
	} else {
		return (
			<img
				className={props.className}
				height={props.height}
				width={props.height}
				style={props.style}
				src={props.src}
				onLoad={props.onLoad}
				onError={props.onError}
				children={props.children}
			/>
		);
	}
}
export default CSpacePhoto(Img);