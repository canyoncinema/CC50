import {
	FETCH_ITEM_FILMMAKER,
	RECEIVED_ITEM_FILMMAKER,
	FAILED_ITEM_FILMMAKER
} from '../actionTypes';
import { config } from '../store';
import { getItemFilmmakerFilms } from './item-filmmaker-films-actions';
import { toItemData, toDisplayName } from '../utils/parse-data';
import { wrappedFetch } from '../config';

function fetchItemFilmmaker() {
	return {
		type: FETCH_ITEM_FILMMAKER
	}
}

function receiveItemFilmmaker(dispatch, item, filmShortIdentifier, filmmakerRefName, pgSz) {
	// TODO: MARKDOWN RENDERING
	item.termDisplayName = toDisplayName(item.refName);
	if (!item.termDisplayName) console.error('Should have a termDisplayName field. Check #toDisplayName refName field parsing');
	dispatch(getItemFilmmakerFilms({
		filmmakerRefName,
		pgSz: 6,
		exceptShortIdentifier: filmShortIdentifier
	}));
	return {
		type: RECEIVED_ITEM_FILMMAKER,
		data: item
	}
}

function failItemFilmmaker(error) {
	console.error('Failed Item Request', error);
	return {
		type: FAILED_ITEM_FILMMAKER,
		error
	}
}

export function getItemFilmmaker(filmmakerRefName, filmShortIdentifier, filmmakerOptions) {
	const { filmsByFilmmakerPgSz } = filmmakerOptions;
	return (dispatch) => {
		dispatch(fetchItemFilmmaker());
		wrappedFetch(config.getUrlFromRefName(filmmakerRefName))
			.then(response => {
				if (response.status >= 400) {
					console.error("Bad response from server");
				}
				return response.json();
			})
			.then(payload => {
				const data = toItemData(payload);
				dispatch(receiveItemFilmmaker(dispatch, data, filmShortIdentifier, filmmakerRefName, filmsByFilmmakerPgSz));
			}, error =>
				dispatch(failItemFilmmaker(error))
			);
	}
}