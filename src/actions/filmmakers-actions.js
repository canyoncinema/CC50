import {
	FETCH_FILMMAKERS,
	RECEIVED_FILMMAKERS,
	FAILED_FILMMAKERS
} from '../actionTypes';
import Config from '../config';
const env = process.env.NODE_ENV || 'development';
const config = new Config(env);

const collectionPath = '/personauthorities';
const collectionId = '5b2486be-bc1f-4176-97fa';

function fetchFilmmakers() {
	return {
		type: FETCH_FILMMAKERS
	}
}

function receiveFilmmakers(data) {
	console.log('receiveFilmmakers', data);
	return {
		type: RECEIVED_FILMMAKERS,
		data
	}
}

function failFilmmakers(error) {
	console.log('failFilmmakers', error);
	return {
		type: FAILED_FILMMAKERS,
		error
	}
}

export function getFilmmakers() {
	return (dispatch) => {
		console.log('config.getFilmmakersUrl()', config.filmmakersUrl);
		dispatch(fetchFilmmakers())
		return fetch(config.filmmakersUrl, { headers: config.authHeaders })
			.then(response => {
				if (response.status >= 400) {
					dispatch(failFilmmakers("Bad response from server"));
				}
				return response.json();
			})
			.then(data =>
				dispatch(receiveFilmmakers(data))
			, error =>
				dispatch(failFilmmakers(error))
			);
	}
};