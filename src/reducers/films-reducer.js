import * as types from '../actionTypes';

const initialState = {
	data: [],
	isLoading: false,
	error: null
};

const filmsReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_FILMS:
				return {
					isLoading: true,
					error: null
				};
		case types.RECEIVED_FILMS:
			return {
				isLoading: false,
				error: null,
				data: action.data
			};
		case types.FAILED_FILMS:
			return {
				isLoading: false,
				error: action.error,
				data: []
			};
		default:
			return state;
	}
};

export default filmsReducer;