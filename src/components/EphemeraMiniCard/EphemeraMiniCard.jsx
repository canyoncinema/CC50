import React, { Component } from 'react';
import PhotoFill from '../PhotoFill/PhotoFill';
import './EphemeraMiniCard.css';

import { Link } from 'react-router-dom';

class EphemeraMiniCard extends Component {
	render() {
		const { item, shortIdentifier, title } = this.props;
		return (
			<Link to={`/collection/ephemera/${shortIdentifier}`}>
				<div
					title={title}
					className="EphemeraMiniCard shadow-on-hover">
					<PhotoFill
						width={225}
						height={225*3/4}
						src="https://placeimg.com/640/480/any"
					/>
					<div className="content single-line-ellipsed">
						{title}
					</div>
				</div>
			</Link>
		);
	}
}

export default EphemeraMiniCard;