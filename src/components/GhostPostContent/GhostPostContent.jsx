import React from 'react';
import PropTypes from 'prop-types';
import RichText from '../RichText/RichText';
import './GhostPostContent.css';

const GhostPostContent = ({ className, renderTop, renderBottom, html, published=true }) => (
	<div className={[className, 'GhostPostContent post-template post-full post'].join(' ')}>
		{renderTop && renderTop()}
		<div className="content post-full-content">
			{
				!published ?
				<div className="container"><p>Sorry, this post is not published yet.</p></div>
				:
				<RichText dangerouslySetInnerHTML={{__html: html }}></RichText>
			}
		</div>
		{renderBottom && renderBottom()}
	</div>
);

GhostPostContent.propTypes = {
	html: PropTypes.string.isRequired
}

export default GhostPostContent;