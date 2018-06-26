import {
	FETCH_ITEM_FILMMAKER,
	RECEIVED_ITEM_FILMMAKER,
	FAILED_ITEM_FILMMAKER
} from '../actionTypes';
import { config } from '../store';
import { getItemFilmmakerFilms } from './item-filmmaker-films-actions';
import { toItemData, toDisplayName } from '../utils/parse-data';

function fetchItemFilmmaker() {
	return {
		type: FETCH_ITEM_FILMMAKER
	}
}

function receiveItemFilmmaker(dispatch, item, filmmakerRefName, pgSz) {
	// TODO: MARKDOWN RENDERING
	item.termDisplayName = toDisplayName(item.refName);
	if (!item.termDisplayName) console.error('Should have a termDisplayName field. Check #toDisplayName refName field parsing');
	dispatch(getItemFilmmakerFilms(filmmakerRefName, 6));
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

export function getItemFilmmaker(filmmakerRefName, filmmakerOptions) {
	const { filmsByFilmmakerPgSz } = filmmakerOptions;
	return (dispatch) => {
		dispatch(fetchItemFilmmaker());
		fetch(config.getUrlFromRefName(filmmakerRefName),
			{ headers: config.authHeaders })
			.then(response => {
				if (response.status >= 400) {
					console.error("Bad response from server");
				}
				return response.json();
			})
			.then(payload => {
				const data = toItemData(payload);
				dispatch(receiveItemFilmmaker(dispatch, data, filmmakerRefName, filmsByFilmmakerPgSz));
			}, error =>
				dispatch(failItemFilmmaker(error))
			);
	}
}