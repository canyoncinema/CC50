import * as types from '../actionTypes';

const SORT_RECENTLY_ADDED = 'RECENTLY_ADDED';

const initialState = {
	isOpen: false,
	activeOption: {
		value: 'updatedAt',
		label: 'Recently Added'
	}
}

const collectionSortReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.OPEN_SORT:
			return Object.assign(state, {
				isOpen: true
			});
		case types.CLOSE_SORT:
			return Object.assign(state, {
				isOpen: false
			});
		case types.REINITIALIZE_SORT:
			// SPEC: Default to Recently Added for all Collection Items
			return {
				isOpen: false,
				activeOption: {
					value: '-created',
					label: 'Recently Added'
				}
			};
		case types.SET_ACTION_SORT_OPTION:
			return Object.assign(state, {
				isOpen: false,
				activeOption: action.option
			});
		default:
			return state;
	}
};

export default collectionSortReducer;