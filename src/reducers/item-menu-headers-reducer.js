import * as types from '../actionTypes';

const initialState = [];
const itemMenuHeadersReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.ADD_ITEM_MENU_HEADER:
			const newState = [...state];
			newState[action.order] = action.header;
			return newState;
		case types.RESET_ITEM_MENU_HEADERS:
			return [];
		default:
			return state;
	}
};

export default itemMenuHeadersReducer;