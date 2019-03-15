import * as types from '../actionTypes';
import { uniqArray } from '../utils/array-helpers';

const initialState = {
	dataByShortIdentifier: new Map(),
    dataByRtSbj: new Map(),
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
						uniqArray(
							(state.dataByShortIdentifier.get(action.shortIdentifier) || [])
							.concat(action.data),
							m => m.blobCsid
						)
					)
			});
		case types.RECEIVED_ITEMS_MEDIA_BY_RT_SBJ:
			// console.log(action)
            return Object.assign(state, {
                dataByRtSbj: new Map(state.dataByRtSbj)
                    .set(
                        action.rtSbj,
                        uniqArray(
                            (state.dataByRtSbj.get(action.rtSbj) || [])
                                .concat(action.data),
                            m => m.blobCsid
                        )
                    )
            });
		default:
			return state;
	}
};

export default itemMediaReducer;