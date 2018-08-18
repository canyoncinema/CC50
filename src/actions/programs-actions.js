// import {
// 	FETCH_EVENTS,
// 	RECEIVED_EVENTS,
// 	FAILED_EVENTS
// } from '../actionTypes';
// import { config } from '../store';
// import { parseFilm, getCsidFromRefName, toItemData, toItemsData, parseItemExhibitionWorks } from '../utils/parse-data';
// import { getItemsMedia } from './items-media-actions';
// import { wrappedFetch } from '../config';
// import { MAX_CAROUSEL_IMAGES } from '../components/Carousel/CoverCarousel';

// const collectionPath = '/personauthorities';
// const collectionId = '5b2486be-bc1f-4176-97fa';

// function fetchEvents() {
// 	return {
// 		type: FETCH_EVENTS
// 	}
// }

// function fetchEventMedia(refName) {
// 	console.log('fetchEventMedia', refName, getCsidFromRefName(refName));
// 	// return up to 3 film stills per film in the Event
// 	// NOTE: Events do not have a shortIdentifier. use its csid
// 	config.fetchEvent(getCsidFromRefName(refName))
// 		.then(response => {
// 			if (response.status >= 400) {
// 				// fail silently
// 				return false;
// 			}
// 			return response.json();
// 		})
// 		.then(data => {
// 			if (data) {
// 				const filmRefNames = parseItemExhibitionWorks(toItemData(data));
// 				console.log('works', filmRefNames);
// 				filmRefNames.forEach(film => getItemsMedia())

// 				// SPEC: pick 1 from each work, until up to MAX_CAROUSEL_IMAGES
				
// 			}
// 		});
// }

// function receiveEvents(dispatch, payload) {
// 	const items = toItemsData(payload, true);
// 	items.forEach(item => fetchEventMedia(item.refName));
// 	return {
// 		type: RECEIVED_EVENTS,
// 		data: items
// 	}
// }

// function failEvents(error) {
// 	console.error('Failed Events Request', error);
// 	return {
// 		type: FAILED_EVENTS,
// 		error
// 	}
// }

// export function getEvents(queryParams) {
// 	return (dispatch) => {
// 		dispatch(fetchEvents());
// 		return wrappedFetch(config.listEventsUrl(queryParams))
// 			.then(response => {
// 				if (response.status >= 400) {
// 					dispatch(failEvents("Bad response from server"));
// 				}
// 				return response.json();
// 			})
// 			.then(data =>
// 				dispatch(receiveEvents(dispatch, data))
// 			)
// 			.catch(error =>
// 				dispatch(failEvents(error))
// 			);
// 	}
// };