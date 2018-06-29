import {
	FETCH_ITEMS_MEDIA,
	RECEIVED_ITEMS_MEDIA,
	FAILED_ITEMS_MEDIA
} from '../actionTypes';
import { config } from '../store';
import { toItemsData } from '../utils/parse-data';

function fetchFilmStills(itemCsid) {
	return {
		type: FETCH_ITEMS_MEDIA,
		itemCsid
	}
}

function receiveFilmStills(itemCsid, data) {
	return {
		type: RECEIVED_ITEMS_MEDIA,
		itemCsid,
		data
	};
}

function failedFilmStills(itemCsid, error) {
	return {
		type: FAILED_ITEMS_MEDIA,
		itemCsid,
		error
	}
}

export function getItemsMedia(item) {
	fetchFilmStills(item.csid);
	return dispatch => {
		config.fetchItemMedia({
			refName: item.refName,
			pgSz: 3,
			isFilmStills: true
		})
		.then(response => {
			if (response.status >= 400) {
				// fail silently (still return rest of page)
				console.warn('WARNING: images could not be retrieved for ' + item.termDisplayName);
			}
			return response.json();
		})
		.then(payload => {
			const media = toItemsData(payload, true);
			dispatch(receiveFilmStills(item.csid, media));
		})
		.catch(err => dispatch(failedFilmStills(err)));
	}
}
