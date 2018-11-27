import {
	ADD_ITEMS,
	FETCH_ITEMS,
	RECEIVED_ITEMS,
	FAILED_ITEMS
} from '../actionTypes';
import { config } from '../store';
import { toItemsData, parseFilm, toTotalCount, toPageCount, toPageNum } from '../utils/parse-data';

const collectionPath = '/personauthorities';
const collectionId = '5b2486be-bc1f-4176-97fa';

function fetchItems() {
	return {
		type: FETCH_ITEMS
	}
}

function receiveItemsWithMedia(data) {
	return {
		type: RECEIVED_ITEMS,
		data
	};
}

function receiveItems(collectionItems, payload, sort) {
	const data = toItemsData(payload);
	const totalCount = toTotalCount(payload);
	const pageCount = toPageCount(payload);
	const pageNum = toPageNum(payload);
	return {
		type: RECEIVED_ITEMS,
		data,
		totalCount,
		pageCount,
		pageNum,
	}
}

function addItems(collectionItems, payload, sort) {
	const data = toItemsData(payload);
	const totalCount = toTotalCount(payload);
	const pageCount = toPageCount(payload);
	const pageNum = toPageNum(payload);
	return {
		type: ADD_ITEMS,
		data,
		totalCount,
		pageCount,
		pageNum,
	}
}

function failItems(error) {
	console.error('Failed Items Request', error);
	return {
		type: FAILED_ITEMS,
		error
	}
}

export function getItems(collectionItems, queryParams, pageNum=0, shouldAddItems=false) {
	return (dispatch) => {
		if (!shouldAddItems) dispatch(fetchItems());
		return config.fetchItems(collectionItems, Object.assign(queryParams, {
				pgNum: pageNum,
			}))
			.then(response => {
				if (response.status >= 400) {
					dispatch(failItems("Bad response from server"));
				}
				return response.json();
			})
			.then(data => {
				if (shouldAddItems) {
					dispatch(addItems(collectionItems, data));
				} else {
					dispatch(receiveItems(collectionItems, data));
				}
			}
			)
			.catch(error =>
				dispatch(failItems(error))
			);
	}
};

let initializingAppendItems = false;

export function appendItems(collectionItems, queryParams, pageNum=0) {
	return dispatch => {
		if (initializingAppendItems) return Promise.resolve(true);
		initializingAppendItems = true;
		return dispatch(getItems(collectionItems, queryParams, pageNum, true))
			.then(() => {
				initializingAppendItems = false;
			});
	};
};
