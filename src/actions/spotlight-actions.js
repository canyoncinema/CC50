import {
	FETCH_SPOTLIGHT,
	RECEIVED_SPOTLIGHT,
	FAILED_SPOTLIGHT,
	FETCH_SPOTLIGHT_ITEM_DATA,
	RECEIVED_SPOTLIGHT_ITEM_DATA,
	FAILED_SPOTLIGHT_ITEM_DATA
} from '../actionTypes';
import { config } from '../store';
import { parseFilm, getShortIdentifierFromRefName, toItemData } from '../utils/parse-data';

const collectionPath = '/personauthorities';
const collectionId = '5b2486be-bc1f-4176-97fa';

function fetchSpotlight() {
	return {
		type: FETCH_SPOTLIGHT
	}
}

function receiveSpotlight(items, sort) {
	// const data = toSpotlightData(payload);
	// data = data.map(d => parseFilm(d));
	items = items.map(item => ({ blobCsid: item.blobCsid }));
	return {
		type: RECEIVED_SPOTLIGHT,
		data: items
	}
}

function fetchSpotlightItemData(itemIndex, item) {
	return {
		type: FETCH_SPOTLIGHT_ITEM_DATA,
		itemIndex
	};
}

function receiveSpotlightItemData(itemIndex, item) {
	return {
		type: RECEIVED_SPOTLIGHT_ITEM_DATA,
		itemIndex,
		data: item
	};
}

function failSpotlight(error) {
	console.error('Failed Spotlight Request', error);
	return {
		type: FAILED_SPOTLIGHT,
		error
	}
}

function getSpotlightItemsData(dispatch, items=[]) {
	items.forEach((item, itemIndex) => {
		dispatch(fetchSpotlightItemData(itemIndex));
		if (item.filmSubject) {
			// is a film still. Fetch film info as well
			config.fetchItem({
				collectionItems: 'films',
				shortIdentifier: getShortIdentifierFromRefName(item.filmSubject)
			})
			.then(response => response.json())
			.then(payload => toItemData(payload))
			.then(item => dispatch(receiveSpotlightItemData(itemIndex, item)))
		} else {
			// TODO: structure for filmmaker media, etc.?? ask Nima
		}
	});
}

export function getSpotlight() {
	return (dispatch) => {
		dispatch(fetchSpotlight());
		return config.fetchSpotlightMediaItems()
			.then(items => {
				dispatch(receiveSpotlight(items));
				getSpotlightItemsData(dispatch, items);
			})
			.catch(error =>
				dispatch(failSpotlight(error))
			);
	}
};