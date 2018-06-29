import React, { Component } from 'react';
import './ThumbnailCarousel.css';
import PhotoFill from '../PhotoFill/PhotoFill';
import Caret from '../Caret/Caret';
import { blobCsidToSrc } from '../../utils/parse-data';

const ThumbnailCarousel = ({ media, className }) => {
	if (!media.length) return null;
	const hasMore = media.length > 4;
	const hasNav = media.length > 1;
	return (
		<div className={['ThumbnailCarousel', className].join(' ')}>
			{
				hasNav ?
				<nav className={hasMore ? 'carousel has-more' : 'carousel'}>
					{
						hasMore ?
						<Caret direction="up" />
						: null
					}
					{
						media.map((m, i) =>
							<PhotoFill
								src={blobCsidToSrc(m.blobCsid, '80x60')}
								width="80px"
								height="60px"
							/>
						)
					}
					{
						hasMore ?
						<Caret direction="down" />
						: null
					}
				</nav>
				: null
			}
			<PhotoFill
				src={blobCsidToSrc(media[0].blobCsid, '360x270')}
				height="254px"
				width="339px" />
		</div>
	);
};

export default ThumbnailCarousel;
