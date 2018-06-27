import * as types from '../actionTypes';

const initialState = {
	data: null,
	isLoading: false,
	error: null
};

const itemFilms = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_ITEM_FILMS:
			return {
				isLoading: true,
				error: null,
				data: null
			};
		case types.RECEIVED_ITEM_FILMS:
			return {
				isLoading: false,
				error: null,
				data: action.data
			};
		case types.FAILED_ITEM_FILMS:
			return {
				isLoading: false,
				error: action.error,
				data: null
			};
		default:
			return state;
	}
};

export default itemFilms;