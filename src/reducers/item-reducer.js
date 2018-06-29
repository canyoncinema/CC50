import * as types from '../actionTypes';
import itemFilmmaker from './item-filmmaker-reducer';
import itemFilms from './item-films-reducer';
import itemMedia from './item-media-reducer';

const initialState = {
	data: undefined,
	isLoading: false,
	error: undefined,
	filmmaker: undefined,
	films: undefined,
	collectionItems: undefined,
	media: undefined
};

const itemReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_ITEM:
			return {
				isLoading: true,
				error: undefined,
				filmmaker: undefined,
				films: itemFilms(state.films, action),
				media: itemMedia(state.media, action)
			};
		case types.RECEIVED_ITEM:
			return Object.assign(state, {
				isLoading: false,
				error: undefined,
				data: action.data,
				films: itemFilms(state.films, action),
				collectionItems: action.collectionItems,
				media: itemMedia(state.media, action)
			});
		case types.FAILED_ITEM:
			return {
				isLoading: false,
				error: action.error,
				data: undefined,
				filmmaker: undefined,
				films: itemFilms(state.films, action),
				collectionItems: undefined,
				media: itemMedia(state.media, action)
			};
		default:
			return {
				...state,
				filmmaker: itemFilmmaker(state.filmmaker, action),
				films: itemFilms(state.films, action),
				media: itemMedia(state.media, action)
			};
	}
};

export default itemReducer;