import * as types from '../actionTypes';

const initialState = {
	show: false,
	activeIndex: 0,
	itemAspects: []
};

function fullSizedCarousel(state=initialState, action) {
	switch (action.type) {
		case types.SHOW_FULL_SIZED_CAROUSEL:
			return Object.assign(state, {
				show: true
			});
		case types.SET_FULL_SIZED_CAROUSEL_PHOTO:
			return Object.assign(state, {
				show: true,
				activeIndex: action.activeIndex 
			});
		case types.HIDE_FULL_SIZED_CAROUSEL:
			return Object.assign(state, {
				show: false
			});
		case types.SET_FULL_SIZED_CAROUSEL_ITEM_ASPECT:
			const itemAspects = state.itemAspects.slice();
			itemAspects[action.index] = {
				width: action.width,
				height: action.height
			};
			return Object.assign(state, {
				itemAspects
			});
		default:
			return state;
	}
}

export default fullSizedCarousel;