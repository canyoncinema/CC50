import {
	FETCH_NEWS,
	RECEIVED_NEWS,
	FAILED_NEWS
} from '../actionTypes';
import { config } from '../store';
import { toNewsItemsData } from '../utils/parse-data';

function fetchNews() {
	return {
		type: FETCH_NEWS
	}
}

function receiveNews(dispatch, payload) {
	const items = toNewsItemsData(payload.posts); // TODO
	return {
		type: RECEIVED_NEWS,
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

export function getNews({ limit }) {
	return (dispatch) => {
		dispatch(fetchNews());
		return config.listNews({
			limit
		})
			.then(response => {
				if (response.status >= 400) {
					dispatch(failNews("Bad response from server"));
				}
				return response.json();
			})
			.then(payload =>
				dispatch(receiveNews(dispatch, payload))
			)
			.catch(error =>
				dispatch(failNews(error))
			);
	}
};