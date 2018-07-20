import {
	FETCH_FILMS,
	RECEIVED_FILMS,
	FAILED_FILMS
} from '../actionTypes';
import { config } from '../store';
import { parseFilm, toItemsData } from '../utils/parse-data';
import { getItemsMedia } from './items-media-actions';
import { wrappedFetch } from '../config';

const collectionPath = '/personauthorities';
const collectionId = '5b2486be-bc1f-4176-97fa';

function fetchFilms() {
	return {
		type: FETCH_FILMS
	}
}

function receiveFilms(dispatch, payload) {
	const items = toItemsData(payload);
	// return up to 3 film stills per film item
	// and indicate num of stills per film (for carousel 'see more')
	items.forEach(item => {
		dispatch(getItemsMedia(item));
	});
	return {
		type: RECEIVED_FILMS,
		data: items
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
		dispatch(fetchFilms());
		return wrappedFetch(config.listFilmsUrl(queryParams))
			.then(response => {
				if (response.status >= 400) {
					dispatch(failFilms("Bad response from server"));
				}
				return response.json();
			})
			.then(data =>
				dispatch(receiveFilms(dispatch, data))
			)
			.catch(error =>
				dispatch(failFilms(error))
			);
	}
};