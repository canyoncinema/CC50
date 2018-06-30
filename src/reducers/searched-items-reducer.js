import * as types from '../actionTypes';

const initialState = {
	data: undefined,
	isLoading: false,
	error: undefined,
	films: undefined,
	searchedText: '',
	totalCount: 0
};

const searchedItems = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_SEARCHED_ITEMS:
			return {
				isLoading: true,
				error: undefined,
				data: undefined
			};
		case types.RECEIVED_SEARCHED_ITEMS:
			return {
				isLoading: false,
				error: undefined,
				data: action.data,
				searchedText: action.searchedText,
				totalCount: action.totalCount,
				pageCount: action.pageCount
			};
		case types.FAILED_SEARCHED_ITEMS:
			return {
				isLoading: false,
				error: action.error,
				data: undefined
			};
		default:
			return state;
	}
};

export default searchedItems;