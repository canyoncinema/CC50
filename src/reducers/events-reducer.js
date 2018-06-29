import * as types from '../actionTypes';

const initialState = {
	data: undefined,
	isLoading: false,
	error: undefined,
	upcoming: undefined,
	past: undefined
};

const eventsReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_EVENTS:
				return {
					isLoading: true,
					error: undefined
				};
		case types.RECEIVED_EVENTS:
			return {
				isLoading: false,
				error: undefined,
				data: action.data
			};
		case types.FAILED_EVENTS:
			return {
				isLoading: false,
				error: action.error,
				data: undefined
			};
		default:
			return state;
	}
};

export default eventsReducer;