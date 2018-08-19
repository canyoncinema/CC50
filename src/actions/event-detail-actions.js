import {
	FETCH_EVENT_DETAIL,
	RECEIVED_EVENT_DETAIL,
	FAILED_EVENT_DETAIL
} from '../actionTypes';
import { config } from '../store';
import { parseFilm, getCsidFromRefName, toItemData,
	parseItemExhibitionWorks,
	parseExhibitionVenueGroup, parseExhibitionVenueUrl, parseExhibitionVenueDisplayName,
	parseExhibitionStartTime, parseExhibitionEndTime,
	getDisplayNameFromRefName, getShortIdentifierFromRefName
} from '../utils/parse-data';
import { getItemsMedia } from './items-media-actions';
import { getEventDetailFilms } from './event-detail-films-actions';
import { wrappedFetch } from '../config';
import { MAX_CAROUSEL_IMAGES } from '../components/Carousel/CoverCarousel';

function fetchEventDetail() {
	return {
		type: FETCH_EVENT_DETAIL
	}
}

function getEventFilms(filmRefNames) {
	return (filmRefNames || []).map(filmRefName => ({
		termDisplayName: getDisplayNameFromRefName(filmRefName),
		shortIdentifier: getShortIdentifierFromRefName(filmRefName),
		refName: filmRefName
	}));
}

function receiveEventDetail(dispatch, payload) {
	const item = toItemData(payload);
	// TODO: price string
	item.price = null;
	item.startDateTime = parseExhibitionStartTime(item);
	item.endDateTime = parseExhibitionEndTime(item);
	const venueGroup = parseExhibitionVenueGroup(item);
	item.venueDisplayName = parseExhibitionVenueDisplayName(item);
	item.venueUrl = parseExhibitionVenueUrl(item);
	// TODO: differ date from dateTime (incl. midnight)
	const filmRefNames = parseItemExhibitionWorks(item);
	item.films = getEventFilms(filmRefNames);
	dispatch(getEventDetailFilms(filmRefNames));

	return {
		type: RECEIVED_EVENT_DETAIL,
		data: item
	}
}

function failEventDetail(error) {
	console.error('Failed EventDetail Request', error);
	return {
		type: FAILED_EVENT_DETAIL,
		error
	}
}

export function getEventDetail(csid) {
	return (dispatch) => {
		dispatch(fetchEventDetail());
		return config.fetchEvent(csid)
			.then(response => {
				if (response.status >= 400) {
					dispatch(failEventDetail("Bad response from server"));
				}
				return response.json();
			})
			.then(data =>
				dispatch(receiveEventDetail(dispatch, data))
			)
			.catch(error =>
				dispatch(failEventDetail(error))
			);
	}
};