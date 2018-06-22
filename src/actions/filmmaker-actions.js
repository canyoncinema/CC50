import {
	FETCH_FILMMAKER,
	RECEIVED_FILMMAKER,
	FAILED_FILMMAKER
} from '../actionTypes';
import { config } from '../store';

function fetchFilmmakers() {
	return {
		type: FETCH_FILMMAKER
	}
}

function receiveFilmmaker(payload) {
	let data = payload['ns2:abstract-common-list']['list-item'];
	if (data.length === undefined) data = [data];
	return {
		type: RECEIVED_FILMMAKER,
		data
	}
}

function failFilmmaker(error) {
	console.error('Failed Filmmakers Request', error);
	return {
		type: FAILED_FILMMAKER,
		error
	}
}

export function getFilmmaker(uri) {
	return (dispatch) => {
		dispatch(fetchFilmmakers())
		return fetch(config.getUrl(uri), { headers: config.authHeaders })
			.then(response => {
				if (response.status >= 400) {
					dispatch(failFilmmaker("Bad response from server"));
				}
				return response.json();
			})
			.then(data =>
				dispatch(receiveFilmmaker(data))
			, error =>
				dispatch(failFilmmakers(error))
			);
	}
};