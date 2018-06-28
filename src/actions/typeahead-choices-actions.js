import {
	FETCH_CHOICES,
	RECEIVED_CHOICES,
	FAILED_CHOICES
} from '../actionTypes';
import { config } from '../store';
import { parseFilm } from '../utils/parse-data';

const collectionPath = '/personauthorities';
const collectionId = '5b2486be-bc1f-4176-97fa';

function fetchChoices() {
	return {
		type: FETCH_CHOICES
	}
}

function receiveChoices(payload, collectionItems) {
	if (payload['ns2:abstract-common-list'].itemsInPage === '0') {
		return {
			type: RECEIVED_CHOICES,
			data: [],
			collectionItems
		}
	}
	let data = payload['ns2:abstract-common-list']['list-item'];
	if (data.length === undefined) data = [data];
	return {
		type: RECEIVED_CHOICES,
		data,
		collectionItems
	}
}

function failChoices(error) {
	console.error('Failed Choices Request', error);
	return {
		type: FAILED_CHOICES,
		error
	}
}

export function getChoices(collectionItems, choiceText) {
	const queryParams = {
		pgSz: 7,
		pt: choiceText
	};
	return (dispatch) => {
		dispatch(fetchChoices());
		return config.fetchItems(collectionItems, queryParams)
			.then(response => {
				if (response.status >= 400) {
					dispatch(failChoices("Bad response from server"));
				}
				return response.json();
			})
			.then(data =>
				dispatch(receiveChoices(data, collectionItems))
			)
			.catch(error =>
				dispatch(failChoices(error))
			);
	}
};