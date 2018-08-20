import * as types from '../actionTypes';

const initialState = {
	data: {},
	isLoading: false,
	error: undefined
};

const newsDetailReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_NEWS_DETAIL:
				return {
					isLoading: true,
					error: undefined
				};
		case types.RECEIVED_NEWS_DETAIL:
			return {
				isLoading: false,
				error: undefined,
				data: action.data
			};
		case types.FAILED_NEWS_DETAIL:
			return {
				isLoading: false,
				error: action.error,
				data: undefined
			};
		default:
			return state;
	}
};

export default newsDetailReducer;