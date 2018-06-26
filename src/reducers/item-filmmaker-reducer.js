import * as types from '../actionTypes';
import films from './item-filmmaker-films-reducer';

const initialState = {
	data: undefined,
	isLoading: false,
	error: undefined,
	films: undefined
};

const itemFilmmakerReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_ITEM_FILMMAKER:
				return {
					isLoading: true,
					error: undefined,
					films: undefined
				};
			return 
		case types.RECEIVED_ITEM_FILMMAKER:
			return Object.assign(state, {
				isLoading: false,
				error: undefined,
				data: action.data
			});
		case types.FAILED_ITEM_FILMMAKER:
			return {
				isLoading: false,
				error: action.error,
				data: undefined,
				films: undefined
			};
		default:
			return Object.assign(state, {
				films: films(state.films, action)
			});
	}
};

export default itemFilmmakerReducer;