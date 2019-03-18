import * as types from '../actionTypes';

const initialState = {
	data: [],
	mediaByCsid: [],
	isLoading: false,
	error: null,
	totalCount: 0
};

const programsReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_PROGRAMS:
            return {
                ...state,
                isLoading: true,
                error: null
            };
		case types.RECEIVED_PROGRAMS:
			return {
				isLoading: false,
				error: null,
				data: action.data,
                totalCount: action.totalCount,
            };
		case types.RECEIVED_PROGRAM_MEDIA:
            const newStateData = state.data.slice();
            return Object.assign(state, {
                data: newStateData
            })
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