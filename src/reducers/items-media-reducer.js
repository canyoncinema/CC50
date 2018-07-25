import * as types from '../actionTypes';

const initialState = {
	dataByShortIdentifier: new Map(),
	isLoadingByShortIdentifier: new Map(),
	errorByShortIdentifier: new Map()
};

const itemMediaReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_ITEMS_MEDIA:
			return Object.assign(state, {
				isLoadingByShortIdentifier: new Map(state.isLoadingByShortIdentifier)
					.set(action.shortIdentifier, true)
			});
		case types.FAILED_ITEMS_MEDIA:
			return Object.assign(state, {
				errorByShortIdentifier: new Map(state.errorByShortIdentifier)
					.set(action.shortIdentifier, action.error)
			});
		case types.RECEIVED_ITEMS_MEDIA:
			return Object.assign(state, {
				dataByShortIdentifier: new Map(state.dataByShortIdentifier)
					.set(
						action.shortIdentifier,
						(state.dataByShortIdentifier.get(action.shortIdentifier) || []).concat(action.data)
					)
			});
		default:
			return state;
	}
};

export default itemMediaReducer;