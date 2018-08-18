import * as types from '../actionTypes';

const initialState = new Map();

const eventDetailFilmsReducer = (state=initialState, action) => {
	let newState;
	switch (action.type) {
		case types.FETCH_EVENT_DETAIL_FILMS:
			newState = new Map();
			action.filmRefNames.forEach((filmRefName) => {
			  newState.set(action.filmRefName, {
			  	isLoading: true,
			  	error: undefined,
			  	data: undefined
			  });
			});
			return newState;
		case types.RECEIVED_EVENT_DETAIL_FILM:
			newState = new Map(state);
			newState.set(action.filmRefName, {
				isLoading: false,
				error: undefined,
				data: action.data
			});
			console.log('get', newState.get(action.filmRefName))
			return newState;
		case types.FAILED_EVENT_DETAIL_FILM:
			newState = new Map(state);
			newState.set(action.filmRefName, {
				isLoading: false,
				error: action.error,
				data: undefined
			});
			return newState;
		case types.FAILED_EVENT_DETAIL_FILMS:
			newState = new Map(state);
			action.filmRefNames.forEach(refName => {
				newState.set(refName, {
					error: action.error
				});
			});
			return newState;
		default:
			return state;
	}
};

export default eventDetailFilmsReducer;