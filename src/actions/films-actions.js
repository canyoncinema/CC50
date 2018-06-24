import {
	FETCH_FILMS,
	RECEIVED_FILMS,
	FAILED_FILMS
} from '../actionTypes';
import { config } from '../store';
import { parseFilm } from '../utils/parse-data';

const collectionPath = '/personauthorities';
const collectionId = '5b2486be-bc1f-4176-97fa';

function fetchFilms() {
	return {
		type: FETCH_FILMS
	}
}

function receiveFilms(payload) {
	let data = payload['ns2:abstract-common-list']['list-item'];
	if (data.length === undefined) data = [data];
	// data = data.map(d => parseFilm(d));
	return {
		type: RECEIVED_FILMS,
		data
	}
}

function failFilms(error) {
	console.error('Failed Films Request', error);
	return {
		type: FAILED_FILMS,
		error
	}
}

export function getFilms(queryParams) {
	return (dispatch) => {
		console.log('GET', config.listFilmsUrl(queryParams));
		dispatch(fetchFilms());
		return fetch(config.listFilmsUrl(queryParams),
			{ headers: config.authHeaders })
			.then(response => {
				if (response.status >= 400) {
					dispatch(failFilms("Bad response from server"));
				}
				return response.json();
			})
			.then(data =>
				dispatch(receiveFilms(data))
			)
			.catch(error =>
				dispatch(failFilms(error))
			);
	}
};