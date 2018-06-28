import * as types from '../actionTypes';

const initialState = {
	data: undefined,
	isLoading: false,
	error: undefined
};

const postsReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_POSTS:
				return {
					isLoading: true,
					error: undefined
				};
			return 
		case types.RECEIVED_POSTS:
			return {
				isLoading: false,
				error: undefined,
				data: action.data
			};
		case types.FAILED_POSTS:
			return {
				isLoading: false,
				error: action.error,
				data: undefined
			};
		default:
			return state;
	}
};

export default postsReducer;