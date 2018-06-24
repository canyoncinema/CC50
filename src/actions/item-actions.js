import {
	FETCH_ITEM,
	RECEIVED_ITEM,
	FAILED_ITEM
} from '../actionTypes';
import { resetItemMenuHeaders } from './item-menu-headers-actions';
import { config } from '../store';
import { toItemData } from '../utils/parse-data';

function fetchItem() {
	return {
		type: FETCH_ITEM
	}
}

function toDisplayName(refName) {
	return refName.match(/\'(.+)\'$/)[1];
}

function receiveItem(payload) {
	const data = toItemData(payload);
	// HACKS FOR CSPACE
	// films: workauthorities
	// filmmakers: personauthorities
	// ephemera: 
	// programs: 
	// events/exhibiitons: 
	// news: 

	// CSPACE: parse name
	// TODO: MARKDOWN RENDERING
	data.displayName = toDisplayName(data.refName);
	if (!data.displayName) console.error('Should have a displayName field. Check refName field parsing');
	return {
		type: RECEIVED_ITEM,
		data
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

const relatedCollections = {
	films: ['films']
}

export function getItem(collectionItems, shortIdentifier) {
	/*
	 * Related Objects Reqs per item:
	 * films: item.otherFilmsByFilmmaker, item.ephemera, item.events, item.programs
	 * filmmakers: item.films, item.ephemera, item.programs, item.events, item.news
	 * programs: item.films, item.filmmakers, item.ephemera, item.events
	 */
	return (dispatch) => {
		dispatch(fetchItem());
		return fetch(config.getItemUrl({ collectionItems, shortIdentifier }), { headers: config.authHeaders })
			.then(response => {
				if (response.status >= 400) {
					dispatch(failItem("Bad response from server"));
				}
				return response.json();
			})
			.then(data => {
				// if (collectionItems === 'films') {
				// 	// related objects:
				// 	// item.otherFilmsByFilmmaker, item.ephemera, item.events, item.programs
				// 	Promise.all([getItemPromise()])
				// 	debugger
				// }
				dispatch(receiveItem(data));
				dispatch(resetItemMenuHeaders())
			}, error =>
				dispatch(failItem(error))
			);
	}
};