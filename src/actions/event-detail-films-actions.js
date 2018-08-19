import {
	FETCH_EVENT_DETAIL_FILMS,
	RECEIVED_EVENT_DETAIL_FILM,
	FAILED_EVENT_DETAIL_FILM,
	FAILED_EVENT_DETAIL_FILMS
} from '../actionTypes';
import { config } from '../store';
import { toItemData, toDisplayName,
	parseCreatorRefName,
	getShortIdentifierFromRefName } from '../utils/parse-data';

function fetchEventFilms(filmRefNames) {
	return {
		type: FETCH_EVENT_DETAIL_FILMS,
		filmRefNames
	}
}

function receiveEventFilm(dispatch, filmRefName, payload) {
	const film = toItemData(payload);
	film.creator = parseCreatorRefName(film);
	return {
		type: RECEIVED_EVENT_DETAIL_FILM,
		data: film,
		filmRefName
	}
}

function failEventFilm(filmRefName, error) {
	console.error('Failed Item Request', error);
	return {
		type: FAILED_EVENT_DETAIL_FILM,
		error: error || true,
		filmRefName
	}
}

function failEventFilms(filmRefNames, error) {
	return {
		type: FAILED_EVENT_DETAIL_FILMS,
		error,
		filmRefNames
	}
}

export function getEventDetailFilms(filmRefNames) {
	return (dispatch) => {
		dispatch(fetchEventFilms(filmRefNames));
		config.fetchFilms(filmRefNames)
		.then(payloads => {
			payloads.forEach((payload, i) => {
				if (payload.error) {
					dispatch(failEventFilm(filmRefNames[i], payload.error));
				}
				dispatch(receiveEventFilm(dispatch, filmRefNames[i], payload));
			})
		})
		.catch(error => {
			console.error('Bad films response ', error);
			dispatch(failEventFilms(filmRefNames, error))
		});
	}
}
