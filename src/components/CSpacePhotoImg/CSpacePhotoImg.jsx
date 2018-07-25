import React from 'react';
import CSpacePhoto from '../CSpacePhoto/CSpacePhoto';
import './CSpacePhotoImg.css';

const Img = (props) => props.caption ?
	<div className="CSpacePhotoImg">
		<img {...props} />
		<div className={props.fadedCaption ? 'faded caption' : 'caption'}>
				Film: <em>{props.caption}</em>
			</div>
	</div>
	:
	<img {...props} />;

export default CSpacePhoto(Img);