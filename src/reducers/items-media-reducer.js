import * as types from '../actionTypes';

const initialState = {
	dataByCsid: new Map(),
	isLoadingByCsid: new Map(),
	errorByCsid: new Map()
};

const itemMediaReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_ITEMS_MEDIA:
			return Object.assign(state, {
				isLoadingByCsid: new Map(state.isLoadingByCsid)
					.set(action.itemCsid, true)
			});
		case types.FAILED_ITEMS_MEDIA:
			return Object.assign(state, {
				errorByCsid: new Map(state.errorByCsid)
					.set(action.itemCsid, action.error)
			});
		case types.RECEIVED_ITEMS_MEDIA:
			return Object.assign(state, {
				dataByCsid: new Map(state.dataByCsid)
					.set(action.itemCsid, action.data)
			});
		default:
			return state;
	}
};

export default itemMediaReducer;