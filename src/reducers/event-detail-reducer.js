import * as types from '../actionTypes';
import films from './event-detail-films-reducer';

const initialState = {
	data: {},
	isLoading: false,
	error: undefined,
	films: undefined
};

const eventDetailReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_EVENT_DETAIL:
				return {
					isLoading: true,
					error: undefined,
					data: undefined,
					films: films(state.films, action)
				};
		case types.RECEIVED_EVENT_DETAIL:
			return {
				isLoading: false,
				error: undefined,
				data: action.data,
				films: films(state.films, action)
			};
		case types.FAILED_EVENT_DETAIL:
			return {
				isLoading: false,
				error: action.error,
				data: [],
				films: films(state.films, action)
			};
		default:
			return Object.assign(state, {
				films: films(state.films, action)
			});
	}
};

export default eventDetailReducer;
