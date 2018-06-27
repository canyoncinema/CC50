import * as types from '../actionTypes';

const initialState = {
	data: undefined,
	isLoading: false,
	error: undefined,
	films: undefined
};

const itemFilms = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_ITEM_FILMS:
			return {
				isLoading: true,
				error: undefined,
				data: undefined
			};
		case types.RECEIVED_ITEM_FILMS:
			return {
				isLoading: false,
				error: undefined,
				data: action.data
			};
		case types.FAILED_ITEM_FILMS:
			return {
				isLoading: false,
				error: action.error,
				data: undefined
			};
		default:
			return state;
	}
};

export default itemFilms;