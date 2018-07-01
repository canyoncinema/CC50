import * as types from '../actionTypes';

const initialState = {
	dataByShortIdentifier: new Map(),
	isLoadingByShortIdentifier: new Map(),
	errorByShortIdentifier: new Map()
};

const itemMediaReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_FILMMAKERS_MEDIA:
			return Object.assign(state, {
				isLoadingByShortIdentifier: new Map(state.isLoadingByShortIdentifier)
					.set(action.itemCsid, true)
			});
		case types.FAILED_FILMMAKERS_MEDIA:
			return Object.assign(state, {
				errorByShortIdentifier: new Map(state.errorByShortIdentifier)
					.set(action.itemCsid, action.error)
			});
		case types.RECEIVED_FILMMAKERS_MEDIA:
			return Object.assign(state, {
				dataByShortIdentifier: new Map(state.dataByShortIdentifier)
					.set(action.itemCsid, action.data)
			});
		default:
			return state;
	}
};

export default itemMediaReducer;