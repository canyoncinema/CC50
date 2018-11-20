import * as types from '../actionTypes';

const initialState = {
	data: null,
	isLoading: false,
	error: null,
	pageNum: null,
};

const itemsReducer = (state=initialState, action) => {
	const { data, totalCount, pageCount, pageNum } = action;
	switch (action.type) {
		case types.FETCH_ITEMS:
				return {
					...state,
					isLoading: true,
					error: null
				};
		case types.RECEIVED_ITEMS:
			return {
				...state,
				isLoading: false,
				error: null,
				data,
				totalCount,
				pageCount,
				pageNum,
			};
		case types.ADD_ITEMS:
			return {
				...state,
				isLoading: false,
				error: null,
				data: (state.data || []).concat(data),
				totalCount,
				pageCount,
				pageNum,
			};
		case types.FAILED_ITEMS:
			return {
				...state,
				isLoading: false,
				error: action.error,
			};
		default:
			return state;
	}
};

export default itemsReducer;