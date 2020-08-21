import React, { Component } from 'react';

import PhotoFill, { EMPTY_STILL_PATH } from '../PhotoFill/PhotoFill';

const ORIGINAL_PHOTO_SIZE_SUFFIX = '_o';

export const CSpaceOrderedSizes = [{
	name: 'thumbnail',
	width: 80,
	height: 60,
	suffix: '_80x60'
},
{
	name: 'event_thumbnail',
	width: 250,
	height: 110,
	suffix: '_250x110'
} ,{
	name: 'list',
	width: 140,
	height: 105,
	suffix: '_140x105'
}, {
	name: 'large',
	width: 245,
	height: 184,
	suffix: '_245x184'
}, {
	name: 'grid',
	width: 360,
	height: 270,
	suffix: '_360x270'
}, {
	name: 'original',
	width: null,
	height: null,
	suffix: ORIGINAL_PHOTO_SIZE_SUFFIX
}];

export const blobCsidToSrc = (blobCsid, canvasSize, isOriginalSize) =>
	`https://cc50-test-1.azureedge.net/${
		isOriginalSize || canvasSize.name === 'original' ?
		'' : 'thumbs/'}` +
	`${blobCsid}${(!isOriginalSize && canvasSize) ? canvasSize.suffix : ORIGINAL_PHOTO_SIZE_SUFFIX}` +
	`.jpeg`

function CSpacePhoto(ComposedComponent) {
	return class extends Component {
		// available sizes on S3 per image

		findCanvasSize = (size, width, height) => {
			if (size) return size;
			const foundSize = CSpaceOrderedSizes.find(size =>
				size.width === this.props.canvasWidth &&
				size.height === this.props.canvasHeight
			);
			if (!foundSize) console.error('Cannot find size ' + width + ' ' + height);
			return foundSize;
		}

		findCanvasSizeIndex = (sizeToFind, width, height) => {
			const sizeIndex = CSpaceOrderedSizes
				.findIndex(size =>
					(size.name === (sizeToFind && sizeToFind.name)) ||
					(size.width === width && size.height === height)
				);
			if (sizeIndex === -1) console.error('Cannot find size ' + width + ' ' + height);
			return sizeIndex;
		}

		onLoadError = () => {
			const sizeIndex = this.findCanvasSizeIndex(
				this.props.canvasSize,
				this.props.canvasWidth,
				this.props.canvasHeight
			);
			if (sizeIndex >= CSpaceOrderedSizes.length - 1) {
				// fail silently
				console.warn('Sorry, no size up for image ' + this.props.blobCsid +
					'. Cannot load. Silently failing.');
			} else {
				// try and load the next size up
				this.setState({
					canvasSize: CSpaceOrderedSizes[sizeIndex + 1]
				})
			}
		}

		state = {
			adjustedPhotoSize: this.findCanvasSize(
				this.props.canvasSize,
				this.props.canvasWidth,
				this.props.canvasHeight
			)
		}

		render() {
			const {
				blobCsid,
				className,
				children,
				canvasSize,
				width,
				height,
				...rest
			} = this.props;
			const { adjustedPhotoSize } = this.state;

			// SPEC: if image fails to load, go next size up
			// if that fails to load, return CarouselPhotoFiller
			if (!blobCsid) {
				return <PhotoFill src={EMPTY_STILL_PATH} />
			}
			return (
				<ComposedComponent
					className={['CSpacePhoto', className].join(' ')}
					src={blobCsidToSrc(blobCsid, adjustedPhotoSize)}
					onError={this.onLoadError}
					width={canvasSize && canvasSize.width && canvasSize.width + 'px' || width}
					height={canvasSize && canvasSize.height && canvasSize.height + 'px' || height}
					{...rest}
				>
					{children}
				</ComposedComponent>
			);
		}	

	}
}

export const CSpaceCanvasSize = CSpaceOrderedSizes
	.reduce((objByName, size) => {
		objByName[size.name] = size;
		return objByName;
	}, {});

export default CSpacePhoto;