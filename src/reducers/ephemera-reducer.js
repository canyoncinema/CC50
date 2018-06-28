import * as types from '../actionTypes';

const initialState = {
	data: [],
	isLoading: false,
	error: null
};

const ephemeraReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_EPHEMERA:
				return {
					isLoading: true,
					error: null
				};
			return 
		case types.RECEIVED_EPHEMERA:
			return {
				isLoading: false,
				error: null,
				data: action.data
			};
		case types.FAILED_EPHEMERA:
			return {
				isLoading: false,
				error: action.error,
				data: []
			};
		default:
			return state;
	}
};

export default ephemeraReducer;