import {
	FETCH_NEWS,
	RECEIVED_NEWS,
	FAILED_NEWS,
	RECEIVED_NEWS_PAGE_ABOUT,
	RECEIVED_NEWS_PAGE_SUPPORT_US,
    RECEIVED_NEWS_PAGE_TOUR,
    RECEIVED_NEWS_PAGE_PRESS,
} from '../actionTypes';
import { config } from '../store';
import { toNewsItemsData } from '../utils/parse-data';

function fetchNews() {
	return {
		type: FETCH_NEWS
	}
}

function receiveNews(dispatch, payload, receiveActionType) {
	const items = toNewsItemsData(payload.posts); // TODO
	return {
		type: receiveActionType || RECEIVED_NEWS,
		data: items
	}
}

function failNews(error) {
	console.error('Failed News Request', error);
	return {
		type: FAILED_NEWS,
		error
	}
}

export function getNews(queryParams={ limit: 3 }, receiveActionType) {
	return (dispatch) => {
		dispatch(fetchNews());
		return config.listNews(queryParams)
			.then(response => {
				if (response.status >= 400) {
					dispatch(failNews("Bad response from server"));
				}
				return response.json();
			})
			.then(payload =>
				dispatch(receiveNews(dispatch, payload, receiveActionType))
			)
			.catch(error =>
				dispatch(failNews(error))
			);
	}
};