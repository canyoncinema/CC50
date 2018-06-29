import React, { Component } from 'react';
import './ThumbnailCarousel.css';
import PhotoFill from '../PhotoFill/PhotoFill';
import Caret from '../Caret/Caret';
import CSpacePhotoFill, { CSpaceCanvasSize } from '../CSpacePhotoFill/CSpacePhotoFill';
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
							<CSpacePhotoFill key={i}
								width={CSpaceCanvasSize.thumbnail.width}
								height={CSpaceCanvasSize.thumbnail.height}
								canvasSize={CSpaceCanvasSize.thumbnail}
								blobCsid={m.blobCsid}
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
