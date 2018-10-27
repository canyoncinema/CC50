import * as types from '../actionTypes';

const initialState = {
	data: undefined,
	isLoading: false,
	error: undefined,
	// specific news pages
	aboutPage: undefined,
	supportUsPage: undefined
};

const newsReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_NEWS:
				return {
					isLoading: true,
					error: undefined
				};
		case types.RECEIVED_NEWS:
			return {
				isLoading: false,
				error: undefined,
				data: action.data
			};
		case types.RECEIVED_NEWS_PAGE_ABOUT:
			return {
				...state,
				aboutPage: action.data && action.data[0]
			};
		case types.RECEIVED_NEWS_PAGE_SUPPORT_US:
			return {
				...state,
				supportUsPage: action.data && action.data[0]
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