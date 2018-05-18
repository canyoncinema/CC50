import React from 'react';
import './FeaturedPost.css';

import Button from '../Button/Button';

const FeaturedPost = ({ name, summary, buttonText }) => {
	return (
		<div className="FeaturedPost">
			<h3>{name}</h3>
			<p>
				{summary}
			</p>
			<Button size="small">
				{buttonText}
			</Button>
		</div>
	);
}

export default FeaturedPost;