import * as types from '../actionTypes';

const initialState = {
	data: null,
	isLoading: false,
	error: null
};

const itemsReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_ITEMS:
				return {
					isLoading: true,
					error: null
				};
		case types.RECEIVED_ITEMS:
			return {
				isLoading: false,
				error: null,
				data: action.data
			};
		case types.FAILED_ITEMS:
			return {
				isLoading: false,
				error: action.error,
				data: null
			};
		default:
			return state;
	}
};

export default itemsReducer;