import * as types from '../actionTypes';
import itemFilmmaker from './item-filmmaker-reducer';
import itemFilms from './item-films-reducer';

const initialState = {
	data: undefined,
	isLoading: false,
	error: undefined,
	filmmaker: undefined,
	films: undefined,
	collectionItems: undefined
};

const itemReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_ITEM:
			return {
				isLoading: true,
				error: undefined,
				filmmaker: undefined,
				films: itemFilms(state.films, action)
			};
		case types.RECEIVED_ITEM:
			return Object.assign(state, {
				isLoading: false,
				error: undefined,
				data: action.data,
				films: itemFilms(state.films, action),
				collectionItems: action.collectionItems
			});
		case types.FAILED_ITEM:
			return {
				isLoading: false,
				error: action.error,
				data: undefined,
				filmmaker: undefined,
				films: itemFilms(state.films, action),
				collectionItems: undefined
			};
		default:
			return {
				...state,
				filmmaker: itemFilmmaker(state.filmmaker, action),
				films: itemFilms(state.films, action)
			};
	}
};

export default itemReducer;