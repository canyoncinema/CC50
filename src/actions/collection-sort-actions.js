import {
	OPEN_SORT,
	CLOSE_SORT,
	REINITIALIZE_SORT,
	SET_ACTION_SORT_OPTION
} from '../actionTypes';

export function openSort() {
	return {
		type: OPEN_SORT
	}
}

export function closeSort() {
	return {
		type: CLOSE_SORT
	}
}

export function initSort() {
	return {
		type: REINITIALIZE_SORT
	}
}

export function onSort(option) {
	return {
		type: SET_ACTION_SORT_OPTION,
		option
	}
}
