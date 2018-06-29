import React from 'react';

const CarouselPhotoFiller = ({id, bgPhotoSrc, title}) => {
	return (
		<PhotoFill
			className="CarouselPhotoFiller"
			src={bgPhotoSrc}
			width="100%"
			height="100%">
			<div className="foreground">
				<p>View</p>
				<h4>{title}</h4>
			</div>
		</PhotoFill>
	);
};

CarouselPhotoFiller.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	bgPhotoSrc: PropTypes.string.isRequired
};

export default CarouselPhotoFiller;