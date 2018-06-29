import {
	FETCH_ITEM_MEDIA,
	RECEIVED_ITEM_MEDIA,
	FAILED_ITEM_MEDIA
} from '../actionTypes';
import { config } from '../store';
import { toItemsData, toDisplayName } from '../utils/parse-data';

function fetchItemMedia() {
	return {
		type: FETCH_ITEM_MEDIA
	}
}

function receiveItemMedia(payload) {
	const data = toItemsData(payload, true);
	return {
		type: RECEIVED_ITEM_MEDIA,
		data: data
	}
}

function failItemMedia(error) {
	console.error('Failed Item Request', error);
	return {
		type: FAILED_ITEM_MEDIA,
		error
	}
}

export function getItemMedia({ refName, isFilmStills, pgSz=99 }) {
	if (!refName) throw new Error('Expected refName');
	return (dispatch) => {
		dispatch(fetchItemMedia());
		config.fetchItemMedia({
			refName,
			isFilmStills,
			pgSz
		})
		.then(response => {
			if (response.status >= 400) {
				console.error("Bad response from server");
			}
			return response.json();
		})
		.then(payload => {
			dispatch(receiveItemMedia(payload));
		}, error =>
			dispatch(failItemMedia(error))
		);
	}
}