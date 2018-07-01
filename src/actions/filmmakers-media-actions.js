import {
	FETCH_FILMMAKERS_MEDIA,
	RECEIVED_FILMMAKERS_MEDIA,
	FAILED_FILMMAKERS_MEDIA
} from '../actionTypes';
import { config } from '../store';
import { toItemsData } from '../utils/parse-data';

function fetchFilmmakersMedia(itemCsid) {
	return {
		type: FETCH_FILMMAKERS_MEDIA,
		itemCsid
	}
}

function receiveFilmmakersMedia(itemCsid, data) {
	return {
		type: RECEIVED_FILMMAKERS_MEDIA,
		itemCsid,
		data
	};
}

function failedFilmmakersMedia(itemCsid, error) {
	return {
		type: FAILED_FILMMAKERS_MEDIA,
		itemCsid,
		error
	}
}

export function getFilmmakersMedia(item) {
	fetchFilmmakersMedia(item.csid);
	return dispatch => {
		config.fetchItemMedia({
			refName: item.refName,
			pgSz: 3,
			isFilmmakersMedia: true
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
			dispatch(receiveFilmmakersMedia(item.csid, media));
		})
		.catch(err => dispatch(failedFilmmakersMedia(err)));
	}
}
