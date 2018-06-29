import * as types from '../actionTypes';

const initialState = {
	data: undefined,
	isLoading: false,
	error: undefined
};

const itemMediaReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_ITEM_MEDIA:
				return {
					isLoading: true,
					error: undefined
				};
		case types.RECEIVED_ITEM_MEDIA:
			return {
				isLoading: false,
				error: undefined,
				data: action.data
			};
		case types.FAILED_ITEM_MEDIA:
			return {
				isLoading: false,
				error: action.error,
				data: undefined
			};
		default:
			return state;
	}
};

export default itemMediaReducer;