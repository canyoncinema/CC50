import * as types from '../actionTypes';

const initialState = {
	data: undefined,
	isLoading: false,
	error: undefined
};

const otherNewsReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_NEWS_DETAIL_OTHER_NEWS:
				return {
					isLoading: true,
					error: undefined
				};
		case types.RECEIVED_NEWS_DETAIL_OTHER_NEWS:
			return {
				isLoading: false,
				error: undefined,
				data: action.data
			};
		case types.FAILED_NEWS_DETAIL_OTHER_NEWS:
			return {
				isLoading: false,
				error: action.error,
				data: undefined
			};
		default:
			return state;
	}
};

export default otherNewsReducer;