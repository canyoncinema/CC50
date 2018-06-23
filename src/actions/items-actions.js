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
const toSortedUrl = (url, sortVal) => url
//`${url}?sortBy=${sortVal}`;

// example:
/*

curl --user reader@canyoncinema.com:reader -H "Accept: application/json" "https://cs.cancf.com/cspace-services/workauthorities/7a94c0cb-5341-4976-b854/items"

*/

export function getItems(collectionItems, sortVal) {
	return (dispatch) => {
		dispatch(fetchItems());
		console.log('get Items', collectionItems, sortVal);
		console.log('GET', config.getListItemsUrl(collectionItems, sortVal));
		return fetch(config.getListItemsUrl(collectionItems, sortVal), {
				headers: config.authHeaders
			})
			.then(response => {
				if (response.status >= 400) {
					dispatch(failItems("Bad response from server"));
				}
				return response.json();
			})
			.then(data =>
				dispatch(receiveItems(data))
			)
			.catch(error =>
				dispatch(failItems(error))
			);
	}
};