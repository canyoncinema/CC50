import * as types from '../actionTypes';

const initialState = {
	data: null,
	isLoading: false,
	error: null
};

const itemReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_ITEM:
				return {
					isLoading: true,
					error: null
				};
			return 
		case types.RECEIVED_ITEM:
			return {
				isLoading: false,
				error: null,
				data: action.data
			};
		case types.FAILED_ITEM:
			return {
				isLoading: false,
				error: action.error,
				data: null
			};
		default:
			return state;
	}
};

export default itemReducer;