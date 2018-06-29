import {
	FETCH_ITEMS,
	RECEIVED_ITEMS,
	FAILED_ITEMS
} from '../actionTypes';
import { config } from '../store';
import { toItemsData, parseFilm } from '../utils/parse-data';
import { getItemsMedia } from './items-media-actions';

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

function receiveItems(dispatch, collectionItems, payload, sort) {
	let items = toItemsData(payload);
	if (collectionItems === 'films') {
		// return up to 3 film stills per film item
		// and indicate num of stills per film (for carousel 'see more')
		items.forEach(item => {
			dispatch(getItemsMedia(item));
		});
	}
	return {
		type: RECEIVED_ITEMS,
		data: items
	}
}

function failItems(error) {
	console.error('Failed Items Request', error);
	return {
		type: FAILED_ITEMS,
		error
	}
}

export function getItems(collectionItems, queryParams) {
	return (dispatch) => {
		dispatch(fetchItems());
		return config.fetchItems(collectionItems, queryParams)
			.then(response => {
				if (response.status >= 400) {
					dispatch(failItems("Bad response from server"));
				}
				return response.json();
			})
			.then(data =>
				dispatch(receiveItems(dispatch, collectionItems, data))
			)
			.catch(error =>
				dispatch(failItems(error))
			);
	}
};