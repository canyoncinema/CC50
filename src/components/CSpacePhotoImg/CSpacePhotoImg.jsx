import React from 'react';
import { Link } from 'react-router-dom';
import CSpacePhoto from '../CSpacePhoto/CSpacePhoto';
import './CSpacePhotoImg.css';

const Img = (props) => props.caption ?
	<div className="CSpacePhotoImg">
		<img {...props} />
		<div className={props.fadedCaption ? 'faded caption' : 'caption'}>
				Film: <Link to={props.captionLink}>
					<em>{props.caption}</em>
				</Link>
			</div>
	</div>
	:
	<img {...props} fadedCaption={null} captionLink={null} />;

export default CSpacePhoto(Img);