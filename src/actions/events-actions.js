import {
	FETCH_EVENTS,
	RECEIVED_EVENTS,
	FAILED_EVENTS
} from '../actionTypes';
import { config } from '../store';
import { toEventsData, parseFilm } from '../utils/parse-data';

const collectionPath = '/personauthorities';
const collectionId = '5b2486be-bc1f-4176-97fa';

function fetchEvents() {
	return {
		type: FETCH_EVENTS
	}
}

function receiveEvents(payload, sort) {
	const data = toEventsData(payload);
	// data = data.map(d => parseFilm(d));
	return {
		type: RECEIVED_EVENTS,
		data
	}
}

function failEvents(error) {
	console.error('Failed Events Request', error);
	return {
		type: FAILED_EVENTS,
		error
	}
}

export function getEvents(collectionEvents, queryParams) {
	return (dispatch) => {
		dispatch(fetchEvents());
		return config.fetchEvents(collectionEvents, queryParams)
			.then(response => {
				if (response.status >= 400) {
					dispatch(failEvents("Bad response from server"));
				}
				return response.json();
			})
			.then(data =>
				dispatch(receiveEvents(data))
			)
			.catch(error =>
				dispatch(failEvents(error))
			);
	}
};