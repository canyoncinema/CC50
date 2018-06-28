import {
	FETCH_SPOTLIGHT,
	RECEIVED_SPOTLIGHT,
	FAILED_SPOTLIGHT
} from '../actionTypes';
import { config } from '../store';
import { toItemsData, parseFilm } from '../utils/parse-data';

const collectionPath = '/personauthorities';
const collectionId = '5b2486be-bc1f-4176-97fa';

function fetchItems() {
	return {
		type: FETCH_SPOTLIGHT
	}
}

function receiveItems(payload, sort) {
	const data = toItemsData(payload);
	// data = data.map(d => parseFilm(d));
	return {
		type: RECEIVED_SPOTLIGHT,
		data
	}
}

function failItems(error) {
	console.error('Failed Items Request', error);
	return {
		type: FAILED_SPOTLIGHT,
		error
	}
}

export function getSpotlight() {
	return (dispatch) => {
		dispatch(fetchItems());
		return config.fetchSpotlight()
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