import React, { Component } from 'react';

import PhotoFill from '../PhotoFill/PhotoFill';

const ORIGINAL_PHOTO_SIZE_SUFFIX = '_o';

class CSpacePhotoFill extends Component {

	// available sizes on S3 per image
	static orderedSizes = [{
		name: 'thumbnail',
		width: 80,
		height: 60,
		suffix: '_80x60'
	}, {
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
	}]

	findCanvasSize = (size, width, height) => {
		if (size) return size;
		const foundSize = CSpacePhotoFill.orderedSizes.find(size =>
			size.width === this.props.canvasWidth &&
			size.height === this.props.canvasHeight
		);
		if (!foundSize) console.error('Cannot find size ' + width + ' ' + height);
		return foundSize;
	}

	findCanvasSizeIndex = (sizeToFind, width, height) => {
		const sizeIndex = CSpacePhotoFill.orderedSizes
			.findIndex(size =>
				(size.name === (sizeToFind && sizeToFind.name)) ||
				(size.width === width && size.height === height)
			);
		if (sizeIndex === -1) console.error('Cannot find size ' + width + ' ' + height);
		return sizeIndex;
	}

	static blobCsidToSrc = (blobCsid, canvasSize, isOriginalSize) =>
		`https://s3-us-west-2.amazonaws.com/cc50-images/thumbs/` +
		`${blobCsid}${(!isOriginalSize && canvasSize) ? canvasSize.suffix : ORIGINAL_PHOTO_SIZE_SUFFIX}` +
		`.jpeg`

	onLoadError() {
		const sizeIndex = this.findCanvasSizeIndex(
				this.props.canvasSize,
				this.props.canvasWidth,
				this.props.canvasHeight
			);
		if (sizeIndex >= CSpacePhotoFill.orderedSizes.length - 1) {
			console.warn('Sorry, no size up for image ' + this.props.blobCsid +
				'. Cannot load. Silently failing.');
		} else {
			// try and load the next size up
			this.setState({
				canvasSize: CSpacePhotoFill.orderedSizes[sizeIndex + 1]
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
			height
		} = this.props;
		const { adjustedPhotoSize } = this.state;

		// SPEC: if image fails to load, go next size up
		// if that fails to load, return CarouselPhotoFiller
		if (!blobCsid) {
			return <PhotoFill src="images/empty-still.png" />
		}
		return (
			<PhotoFill
				className={['CSpacePhotoFill', className].join(' ')}
				src={CSpacePhotoFill.blobCsidToSrc(blobCsid, adjustedPhotoSize)}
				onerror={this.onLoadError}
				width={canvasSize && (canvasSize.width + 'px') || width}
				height={canvasSize && (canvasSize.height + 'px') || height}
			>
				{children}
			</PhotoFill>
		);
	}
}

export const CSpaceCanvasSize = CSpacePhotoFill.orderedSizes
	.reduce((objByName, size) => {
		objByName[size.name] = size;
		return objByName;
	}, {});

export default CSpacePhotoFill;