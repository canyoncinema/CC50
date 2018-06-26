import {
	FETCH_ITEM_FILMMAKER_FILMS,
	RECEIVED_ITEM_FILMMAKER_FILMS,
	FAILED_ITEM_FILMMAKER_FILMS
} from '../actionTypes';
import { config } from '../store';
import { toItemsData, toDisplayName } from '../utils/parse-data';

function fetchItemFilmmakerFilms() {
	return {
		type: FETCH_ITEM_FILMMAKER_FILMS
	}
}

function receiveItemFilmmakerFilms(payload) {
	const data = toItemsData(payload);
	// dispatch(getItemFilmmakerFilms());
	return {
		type: RECEIVED_ITEM_FILMMAKER_FILMS,
		data: data
	}
}

function failItemFilmmakerFilms(error) {
	console.error('Failed Item Request', error);
	return {
		type: FAILED_ITEM_FILMMAKER_FILMS,
		error
	}
}

export function getItemFilmmakerFilms({ filmmakerRefName, pgSz, exceptShortIdentifier }) {
	if (!filmmakerRefName) throw new Error('Expected filmmakerRefName');
	return (dispatch) => {
		dispatch(fetchItemFilmmakerFilms());
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
				dispatch(receiveItemFilmmakerFilms(payload));
			}, error =>
				dispatch(failItemFilmmakerFilms(error))
			);
	}
}