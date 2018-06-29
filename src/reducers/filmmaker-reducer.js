import * as types from '../actionTypes';

const initialState = {
	data: [],
	isLoading: false,
	error: null
};

const filmmakerReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_FILMMAKER:
				return {
					isLoading: true,
					error: null
				};
		case types.RECEIVED_FILMMAKER:
			return {
				isLoading: false,
				error: null,
				data: action.data
			};
		case types.FAILED_FILMMAKER:
			return {
				isLoading: false,
				error: action.error,
				data: []
			};
		default:
			return state;
	}
};

export default filmmakerReducer;