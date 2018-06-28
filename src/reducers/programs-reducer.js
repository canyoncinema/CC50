import * as types from '../actionTypes';

const initialState = {
	data: [],
	isLoading: false,
	error: null
};

const programsReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_PROGRAMS:
				return {
					isLoading: true,
					error: null
				};
			return 
		case types.RECEIVED_PROGRAMS:
			return {
				isLoading: false,
				error: null,
				data: action.data
			};
		case types.FAILED_PROGRAMS:
			return {
				isLoading: false,
				error: action.error,
				data: []
			};
		default:
			return state;
	}
};

export default programsReducer;