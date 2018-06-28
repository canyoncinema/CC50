import * as types from '../actionTypes';

const initialState = {
	data: undefined,
	isLoading: false,
	error: undefined
};

const newsReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_NEWS:
				return {
					isLoading: true,
					error: undefined
				};
			return 
		case types.RECEIVED_NEWS:
			return {
				isLoading: false,
				error: undefined,
				data: action.data
			};
		case types.FAILED_NEWS:
			return {
				isLoading: false,
				error: action.error,
				data: undefined
			};
		default:
			return state;
	}
};

export default newsReducer;