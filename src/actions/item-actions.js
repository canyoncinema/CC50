import {
	FETCH_ITEM,
	RECEIVED_ITEM,
	FAILED_ITEM
} from '../actionTypes';
import { getItemFilmmaker } from './item-filmmaker-actions';
import { getItemFilms } from './item-films-actions';
import { resetItemMenuHeaders } from './item-menu-headers-actions';
import { config } from '../store';
import { toItemData, toItemsData, toDisplayName } from '../utils/parse-data';
import { getItemsMedia } from './items-media-actions';
import { wrappedFetch } from '../config';

function fetchItem() {
	return {
		type: FETCH_ITEM
	}
}

function receiveItem(dispatch, collectionItems, payload, shortIdentifier, filmmakerOptions, skipPayload) {
	const item = skipPayload ? payload : toItemData(payload);
	item.termDisplayName = skipPayload ? item.termDisplayName : toDisplayName(item.refName);
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
			pgSz: 39,
			exceptShortIdentifier: null
		}));
	} else if (collectionItems === 'films') {
		// show film stills on film
		dispatch(getItemsMedia(item, 'film'));
		item.creator = item.creatorGroupList &&
			item.creatorGroupList.creatorGroup &&
			item.creatorGroupList.creatorGroup.creator;
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
		wrappedFetch(config.getUrlFromRefName(urn))
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

export function setItemData(collectionItems, itemsPayload, shortIdentifier) {
	return (dispatch) => {
		const items = toItemsData(itemsPayload);
		const item = items.find(item => item.shortIdentifier === shortIdentifier);
		dispatch(receiveItem(dispatch, collectionItems, item, shortIdentifier, false, true));
	}
}