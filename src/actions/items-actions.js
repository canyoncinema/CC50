import {
	FETCH_ITEMS,
	RECEIVED_ITEMS,
	FAILED_ITEMS
} from '../actionTypes';
import { config } from '../store';
import { parseFilm } from '../utils/parse-data';

const collectionPath = '/personauthorities';
const collectionId = '5b2486be-bc1f-4176-97fa';

function fetchItems() {
	return {
		type: FETCH_ITEMS
	}
}

function receiveItems(payload, sort) {
	let data = payload['ns2:abstract-common-list']['list-item'];
	if (data.length === undefined) data = [data];
	// data = data.map(d => parseFilm(d));
	return {
		type: RECEIVED_ITEMS,
		data
	}
}

function failItems(error) {
	console.error('Failed Items Request', error);
	return {
		type: FAILED_ITEMS,
		error
	}
}

// TODO: REAL SORTING
const toSortedUrl = (url, sort) => url;

export function getItems(collectionItems, sort) {
	return (dispatch) => {
		dispatch(fetchItems())
		return fetch(toSortedUrl(config.getListItemsUrl(collectionItems), sort), {
				headers: config.authHeaders
			})
			.then(response => {
				if (response.status >= 400) {
					dispatch(failItems("Bad response from server"));
				}
				return response.json();
			})
			.then(data =>
				dispatch(receiveItems(data, sort))
			)
			.catch(error =>
				dispatch(failItems(error))
			);
	}
};