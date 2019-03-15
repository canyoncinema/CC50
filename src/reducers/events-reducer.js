import * as types from '../actionTypes';

const initialState = {
	data: [],
	mediaByCsid: [],
	isLoading: false,
	error: null,
	totalCount: 0,
};

const eventsReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_EVENTS:
				return {
					...state,
					isLoading: true,
					error: null
				};
		case types.RECEIVED_EVENTS:
			return {
				isLoading: false,
				error: null,
				data: action.data,
				totalCount: action.totalCount,
			};
		// case types.RECEIVED_EVENT_MEDIA:
		// 	// TODO
		// 	const newStateData = state.data.slice();
		// 	return Object.assign(state, {
		// 		data: newStateData
		// 	})
		case types.FAILED_EVENTS:
			return {
				isLoading: false,
				error: action.error,
				data: []
			};
		default:
			return state;
	}
};

export default eventsReducer;