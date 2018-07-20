import {
	FETCH_FILMMAKERS,
	RECEIVED_FILMMAKERS,
	FAILED_FILMMAKERS
} from '../actionTypes';
import { config } from '../store';
import { toItemsData } from '../utils/parse-data';
import { getItemsMedia } from './items-media-actions';
import { wrappedFetch } from '../config';

const collectionPath = '/personauthorities';
const collectionId = '5b2486be-bc1f-4176-97fa';

function fetchFilmmakers() {
	return {
		type: FETCH_FILMMAKERS
	}
}

function receiveFilmmakers(dispatch, payload) {
	const items = toItemsData(payload);
	items.forEach(item => {
		dispatch(getItemsMedia(item, 'filmmaker'));
	});
	return {
		type: RECEIVED_FILMMAKERS,
		data: items
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
		return wrappedFetch(config.listFilmmakersUrl(queryParams))
			.then(response => {
				if (response.status >= 400) {
					dispatch(failFilmmakers("Bad response from server"));
				}
				return response.json();
			})
			.then(data => {
				dispatch(receiveFilmmakers(dispatch, data))
			})
			.catch(error =>
				dispatch(failFilmmakers(error))
			);
	}
};