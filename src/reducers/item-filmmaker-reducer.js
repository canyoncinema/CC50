import * as types from '../actionTypes';
import otherFilms from './item-filmmaker-films-reducer';

const initialState = {
	data: undefined,
	isLoading: false,
	error: undefined,
	otherFilms: undefined
};

const itemFilmmakerReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_ITEM_FILMMAKER:
				return {
					isLoading: true,
					error: undefined,
					otherFilms: otherFilms(state.otherFilms, action)
				};
		case types.RECEIVED_ITEM_FILMMAKER:
			return Object.assign(state, {
				isLoading: false,
				error: undefined,
				data: action.data,
				otherFilms: otherFilms(state.otherFilms, action)
			});
		case types.FAILED_ITEM_FILMMAKER:
			return {
				isLoading: false,
				error: action.error,
				data: undefined,
				otherFilms: otherFilms(state.otherFilms, action)
			};
		default:
			return Object.assign(state, {
				otherFilms: otherFilms(state.otherFilms, action)
			});
	}
};

export default itemFilmmakerReducer;