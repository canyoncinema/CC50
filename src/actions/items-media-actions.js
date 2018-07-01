import {
	FETCH_ITEMS_MEDIA,
	RECEIVED_ITEMS_MEDIA,
	FAILED_ITEMS_MEDIA
} from '../actionTypes';
import { config } from '../store';
import { toItemsData,
	getShortIdentifierFromRefName,
	getItemTypeFromRefName
} from '../utils/parse-data';

const fetchedMediaForItemCsids = [];
const fetchedMediaForShortIdentifiers = [];

function fetchItemsMedia(shortIdentifier) {
	return {
		type: FETCH_ITEMS_MEDIA,
		shortIdentifier
	}
}

function receiveItemsMedia(shortIdentifier, data) {
	return {
		type: RECEIVED_ITEMS_MEDIA,
		shortIdentifier,
		data
	};
}

function failedItemsMedia(shortIdentifier, error) {
	return {
		type: FAILED_ITEMS_MEDIA,
		shortIdentifier,
		error
	}
}

export function getItemsMedia(item,
	itemType=getItemTypeFromRefName(item.refName),
	isItemsMedia=true) {
	const shortIdentifier = getShortIdentifierFromRefName(item.refName);
	const queryParams = {
		refName: item.refName,
		pgSz: 3,
		isItemsMedia: itemType === 'film' || itemType === 'filmmaker',
		isByFilmmaker: itemType === 'filmmaker'
	};
	return dispatch => {
		if (fetchedMediaForShortIdentifiers.includes(shortIdentifier)) return;
		config.fetchItemMedia(queryParams)
		.then(response => {
			if (response.status >= 400) {
				// fail silently (still return rest of page)
				console.warn('WARNING: images could not be retrieved for ' + item.termDisplayName);
			}
			return response.json();
		})
		.then(payload => {
			fetchedMediaForShortIdentifiers.push(shortIdentifier);
			const media = toItemsData(payload, true);
			dispatch(receiveItemsMedia(shortIdentifier, media));
		})
		.catch(err => dispatch(failedItemsMedia(shortIdentifier, err)));
	}
}
