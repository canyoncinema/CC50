import {
	ADD_ITEM_MENU_HEADER,
	RESET_ITEM_MENU_HEADERS
} from '../actionTypes';

export function resetItemMenuHeaders(order, header) {
	return {
		type: RESET_ITEM_MENU_HEADERS
	}
}

export function addItemMenuHeader(order, header) {
	return {
		type: ADD_ITEM_MENU_HEADER,
		order,
		header
	}
}