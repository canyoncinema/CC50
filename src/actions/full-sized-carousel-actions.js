import {
	SHOW_FULL_SIZED_CAROUSEL,
	HIDE_FULL_SIZED_CAROUSEL,
	SET_FULL_SIZED_CAROUSEL_PHOTO,
	OFFSET_FULL_SIZED_CAROUSEL_PHOTO,
	SET_FULL_SIZED_CAROUSEL_ITEM_ASPECT
} from '../actionTypes';

export function showFullSizedCarousel() {
	return {
		type: SHOW_FULL_SIZED_CAROUSEL
	}
}

export function setFullSizedCarouselPhoto(activeIndex) {
	return {
		type: SET_FULL_SIZED_CAROUSEL_PHOTO,
		activeIndex
	}
}

export function offsetFullSizedCarouselPhoto(offset, totalCount) {
	return {
		type: OFFSET_FULL_SIZED_CAROUSEL_PHOTO,
		offset,
		totalCount
	}
}

export function hideFullSizedCarousel() {
	return {
		type: HIDE_FULL_SIZED_CAROUSEL
	}
}

export function setFullSizedCarouselItemAspect(index, width, height) {
	return {
		type: SET_FULL_SIZED_CAROUSEL_ITEM_ASPECT,
		index,
		width,
		height
	}
}