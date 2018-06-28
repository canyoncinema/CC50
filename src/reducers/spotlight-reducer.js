import * as types from '../actionTypes';

const initialState = {
	data: undefined,
	isLoading: false,
	error: undefined
};

const postsReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_SPOTLIGHT:
				return {
					isLoading: true,
					error: undefined
				};
			return 
		case types.RECEIVED_SPOTLIGHT:
			return {
				isLoading: false,
				error: undefined,
				data: action.data
			};
		case types.FAILED_SPOTLIGHT:
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