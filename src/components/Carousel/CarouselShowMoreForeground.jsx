import React from 'react';
import './CarouselShowMoreForeground.css';

const CarouselShowMoreForeground = ({ title }) => {
	return (
		<div className="CarouselShowMoreForeground">
			<div className="list-center-wrapper">
				<div>
					<p>View</p>
					<h4 className="single-line-ellipsed">{title}</h4>
				</div>
			</div>
		</div>
	);
}

export default CarouselShowMoreForeground;