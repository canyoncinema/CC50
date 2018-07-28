import {
	FETCH_ITEM_FILMS,
	RECEIVED_ITEM_FILMS,
	FAILED_ITEM_FILMS
} from '../actionTypes';
import { config } from '../store';
import { toItemsData, toDisplayName, getShortIdentifierFromRefName } from '../utils/parse-data';
import { getItemsMedia } from './items-media-actions';

function fetchItemFilms() {
	return {
		type: FETCH_ITEM_FILMS
	}
}

function receiveItemFilms(dispatch, payload, refShortIdentifier) {
	const films = toItemsData(payload);
	return {
		type: RECEIVED_ITEM_FILMS,
		data: films
	}
}

function failItemFilms(error) {
	console.error('Failed Item Request', error);
	return {
		type: FAILED_ITEM_FILMS,
		error
	}
}

export function getItemFilms({ filmmakerRefName, pgSz, exceptShortIdentifier }) {
	if (!filmmakerRefName) throw new Error('Expected filmmakerRefName');
	return (dispatch) => {
		dispatch(fetchItemFilms());
		config.fetchFilmmakerFilms({
			filmmakerRefName,
			pgSz,
			exceptShortIdentifier
		})
		.then(response => {
			if (response.status >= 400) {
				console.error("Bad response from server");
			}
			return response.json();
		})
		.then(payload => {
			dispatch(receiveItemFilms(dispatch, payload, getShortIdentifierFromRefName(filmmakerRefName)));
		}, error =>
			dispatch(failItemFilms(error))
		);
	}
}