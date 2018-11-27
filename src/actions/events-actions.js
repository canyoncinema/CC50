import {
	FETCH_EVENTS,
	RECEIVED_EVENTS,
	FAILED_EVENTS
} from '../actionTypes';
import { config } from '../store';
import { parseFilm, getCsidFromRefName,
	toItemData, toItemsData,
	toTotalCount,
	parseItemExhibitionWorks, addEventFields } from '../utils/parse-data';
import { getItemsMedia } from './items-media-actions';
import { wrappedFetch } from '../config';
import { MAX_CAROUSEL_IMAGES } from '../components/Carousel/CoverCarousel';

const collectionPath = '/personauthorities';
const collectionId = '5b2486be-bc1f-4176-97fa';

function fetchEvents() {
	return {
		type: FETCH_EVENTS
	}
}

// MAX_EVENT_FILM_STILLS: show up to this many film stills, per film on an event
export const MAX_EVENT_FILM_STILLS = 3;

function fetchEventMedia(eventRefName) {
	// return up to 3 film stills per film in the Event
	// NOTE: Events do not have a shortIdentifier. use its csid
	config.fetchEvent(getCsidFromRefName(eventRefName))
		.then(response => {
			if (response.status >= 400) {
				// fail silently
				return false;
			}
			return response.json();
		})
		.then(data => {
			if (data) {
				const filmRefNames = parseItemExhibitionWorks(toItemData(data));
				filmRefNames.forEach(filmRefName => getItemsMedia({
					itemRefName: filmRefName,
					itemType: 'event',
					mappedShortIdentifier: eventRefName 
				}))

				// SPEC: pick 1 from each work, until up to MAX_CAROUSEL_IMAGES
				
			}
		});
}

function receiveEvents(payload) {
	const items = toItemsData(payload, true);
	items.forEach(item => addEventFields(item, null, true));
	// items.forEach(item => fetchEventMedia(item.refName));
	const totalCount = toTotalCount(payload);
	return {
		type: RECEIVED_EVENTS,
		data: items,
		totalCount,
	}
}

function failEvents(error) {
	console.error('Failed Events Request', error);
	return {
		type: FAILED_EVENTS,
		error
	}
}

export function getEvents(queryParams) {
	return (dispatch) => {
		dispatch(fetchEvents({
			sort: 'showingOpeningDate+DESC',
			...queryParams
		}));
		return wrappedFetch(config.listEventsUrl(queryParams))
			.then(response => {
				if (response.status >= 400) {
					dispatch(failEvents("Bad response from server"));
				}
				return response.json();
			})
			.then(data => {
				if (data) dispatch(receiveEvents(data));
				return null;
			})
			.catch(error =>
				dispatch(failEvents(error))
			);
	}
};