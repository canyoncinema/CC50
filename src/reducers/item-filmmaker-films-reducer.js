import * as types from '../actionTypes';

const initialState = {
	data: null,
	isLoading: false,
	error: null
};

const itemFilmmakerFilms = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_ITEM_FILMMAKER_FILMS:
			return {
				isLoading: true,
				error: null,
				data: null
			};
		case types.RECEIVED_ITEM_FILMMAKER_FILMS:
			return {
				isLoading: false,
				error: null,
				data: action.data
			};
		case types.FAILED_ITEM_FILMMAKER_FILMS:
			return {
				isLoading: false,
				error: action.error,
				data: null
			};
		default:
			return state;
	}
};

export default itemFilmmakerFilms;