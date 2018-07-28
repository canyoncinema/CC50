import * as types from '../actionTypes';

const initialState = {
	media: [],
	isLoadingMedia: false,
	error: undefined,
	items: [{
		isLoading: false,
		data: undefined,
		error: undefined
	}, {
		isLoading: false,
		data: undefined,
		error: undefined
	}, {
		isLoading: false,
		data: undefined,
		error: undefined
	}]
};

const spotlight = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_SPOTLIGHT:
				return Object.assign(state, {
					isLoadingMedia: true,
					error: undefined
				});
		case types.RECEIVED_SPOTLIGHT:
			return Object.assign(state, {
				isLoadingMedia: false,
				error: undefined,
				media: action.data
			});
		case types.FAILED_SPOTLIGHT:
			return Object.assign(state, {
				isLoadingMedia: false,
				error: action.error,
				media: undefined
			});
		case types.FETCH_SPOTLIGHT_ITEM_DATA: {
			const newItems = state.items.slice();
			newItems[action.itemIndex].isLoading = true;
			return Object.assign(state, {
				items: newItems
			});
		}
		case types.RECEIVED_SPOTLIGHT_ITEM_DATA: {
			const newItems = state.items.slice();
			newItems[action.itemIndex].isLoading = false;
			newItems[action.itemIndex].data = action.data;
			return Object.assign(state, {
				items: newItems
			});
		}
		case types.FAILED_SPOTLIGHT_ITEM_DATA: {
			const newItems = state.items.slice();
			newItems[action.itemIndex].isLoading = false;
			newItems[action.itemIndex].error = action.data;
			return Object.assign(state, {
				items: newItems
			});
		}
		default:
			return state;
	}
};

export default spotlight;