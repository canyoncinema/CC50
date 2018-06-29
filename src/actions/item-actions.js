import {
	FETCH_ITEM,
	RECEIVED_ITEM,
	FAILED_ITEM
} from '../actionTypes';
import { getItemFilmmaker } from './item-filmmaker-actions';
import { getItemFilms } from './item-films-actions';
import { resetItemMenuHeaders } from './item-menu-headers-actions';
import { config } from '../store';
import { toItemData, toDisplayName } from '../utils/parse-data';
import { getItemMedia } from './item-media-actions';

function fetchItem() {
	return {
		type: FETCH_ITEM
	}
}

function receiveItem(dispatch, collectionItems, payload, shortIdentifier, filmmakerOptions) {
	const item = toItemData(payload);
	// HACKS FOR CSPACE
	// films: workauthorities
	// filmmakers: personauthorities
	// ephemera: 
	// programs: 
	// events/exhibiitons: 
	// news: 

	// CSPACE: parse name
	// TODO: MARKDOWN RENDERING
	item.termDisplayName = toDisplayName(item.refName);
	if (!item.termDisplayName) console.error('Should have a displayName field. Check refName field parsing');
	const filmmakerRefName = item &&
					item.creatorGroupList &&
					item.creatorGroupList.creatorGroup &&
					item.creatorGroupList.creatorGroup.creator;
	// display filmmaker info (for films)
	if (filmmakerRefName) dispatch(getItemFilmmaker(
		filmmakerRefName,
		shortIdentifier,
		filmmakerOptions));
	if (collectionItems === 'filmmakers') {
		// show films by this filmmaker
		dispatch(getItemFilms({
			filmmakerRefName: item.refName,
			pgSz: 40,
			exceptShortIdentifier: null
		}));
	} else if (collectionItems === 'films') {
		// show film stills on film
		dispatch(getItemMedia({
			refName: item.refName,
			isFilmStills: true
		}));
	}
	return {
		type: RECEIVED_ITEM,
		data: item,
		collectionItems
	}
}

function failItem(error) {
	console.error('Failed Item Request', error);
	return {
		type: FAILED_ITEM,
		error
	}
}

function getItemPromise(urn) {
	const url = config.getUrlFromRefName(urn);
	return new Promise((resolve, reject) => {
		fetch(config.getUrlFromRefName(urn), { headers: config.authHeaders })
			.then(response => {
				if (response.status >= 400) {
					reject('Bad response from server');
				}
				return response.json()
			})
			.then(payload => resolve(toItemData(payload)))
			.catch(error => reject(error));
	});
}

export function getItem(collectionItems, shortIdentifier, filmmakerOptions) {
	/*
	 * Related Objects Reqs per item:
	 * films: item.otherFilmsByFilmmaker, item.ephemera, item.events, item.programs
	 * filmmakers: item.films, item.ephemera, item.programs, item.events, item.news
	 * programs: item.films, item.filmmakers, item.ephemera, item.events
	 */
	return (dispatch) => {
		dispatch(fetchItem());
		return config.fetchItem({ collectionItems, shortIdentifier })
			.then(response => {
				if (response.status >= 400) {
					dispatch(failItem("Bad response from server"));
				}
				return response.json();
			})
			.then(payload => {
				// if (collectionItems === 'films') {
				// 	// related objects:
				// 	// item.otherFilmsByFilmmaker, item.ephemera, item.events, item.programs
				// 	Promise.all([getItemPromise()])
				// 	debugger
				// }
				dispatch(receiveItem(dispatch, collectionItems, payload, shortIdentifier, filmmakerOptions));
				dispatch(resetItemMenuHeaders());
			}, error =>
				dispatch(failItem(error))
			);
	}
};