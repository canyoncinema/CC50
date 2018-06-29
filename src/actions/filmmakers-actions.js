import {
	FETCH_FILMMAKERS,
	RECEIVED_FILMMAKERS,
	FAILED_FILMMAKERS
} from '../actionTypes';
import { config } from '../store';

const collectionPath = '/personauthorities';
const collectionId = '5b2486be-bc1f-4176-97fa';

function fetchFilmmakers() {
	return {
		type: FETCH_FILMMAKERS
	}
}

function receiveFilmmakers(payload) {
	let data = payload['ns2:abstract-common-list']['list-item'];
	if (data.length === undefined) data = [data];
	return {
		type: RECEIVED_FILMMAKERS,
		data
	}
}

function failFilmmakers(error) {
	console.error('Failed Filmmakers Request', error);
	return {
		type: FAILED_FILMMAKERS,
		error
	}
}

export function getFilmmakers(queryParams) {
	return (dispatch) => {
		dispatch(fetchFilmmakers());
		return fetch(config.listFilmmakersUrl(queryParams),
			{ headers: config.authHeaders })
			.then(response => {
				if (response.status >= 400) {
					dispatch(failFilmmakers("Bad response from server"));
				}
				return response.json();
			})
			.then(data => {
				dispatch(receiveFilmmakers(data))
			})
			.catch(error =>
				dispatch(failFilmmakers(error))
			);
	}
};