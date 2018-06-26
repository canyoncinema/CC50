import * as types from '../actionTypes';
import filmmaker from './item-filmmaker-reducer';

const initialState = {
	data: undefined,
	isLoading: false,
	error: undefined,
	filmmaker: undefined
};

const itemReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_ITEM:
			return {
				isLoading: true,
				error: undefined,
				filmmaker: undefined
			};
		case types.RECEIVED_ITEM:
			return Object.assign(state, {
				isLoading: false,
				error: undefined,
				data: action.data
			});
		case types.FAILED_ITEM:
			return {
				isLoading: false,
				error: action.error,
				data: undefined,
				filmmaker: undefined
			};
		default:
			return {
				...state,
				filmmaker: filmmaker(state.filmmaker, action)
			};
	}
};

export default itemReducer;