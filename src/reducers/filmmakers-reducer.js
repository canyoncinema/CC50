import * as types from '../actionTypes';

const initialState = {
	data: [],
	isLoading: false,
	error: null
};

const filmmakersReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_FILMMAKERS:
				return {
					isLoading: true,
					error: null
				};
		case types.RECEIVED_FILMMAKERS:
			return {
				isLoading: false,
				error: null,
				data: action.data
			};
		case types.FAILED_FILMMAKERS:
			return {
				isLoading: false,
				error: action.error,
				data: []
			};
		default:
			return state;
	}
};

export default filmmakersReducer;