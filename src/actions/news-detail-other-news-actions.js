import {
	FETCH_NEWS_DETAIL_OTHER_NEWS,
	RECEIVED_NEWS_DETAIL_OTHER_NEWS,
	FAILED_NEWS_DETAIL_OTHER_NEWS
} from '../actionTypes';
import { config } from '../store';
import { toNewsItemData } from '../utils/parse-data';

function fetchNewsDetailOtherNews() {
	return {
		type: FETCH_NEWS_DETAIL_OTHER_NEWS
	}
}

function receiveNewsDetailOtherNews(dispatch, payload) {
	const item = toNewsItemData(payload.posts && payload.posts[0]); // TODO
	return {
		type: RECEIVED_NEWS_DETAIL_OTHER_NEWS,
		data: item
	}
}

function failNewsDetailOtherNews(error) {
	console.error('Failed NewsDetailOtherNews Request', error);
	return {
		type: FAILED_NEWS_DETAIL_OTHER_NEWS,
		error
	}
}

export function getNewsDetailOtherNews({ limit }) {
	return (dispatch) => {
		dispatch(fetchNewsDetailOtherNews());
		return config.listNews({
			limit
		})
			.then(response => {
				if (response.status >= 400) {
					dispatch(failNewsDetailOtherNews("Bad response from server"));
				}
				return response.json();
			})
			.then(payload =>
				dispatch(receiveNewsDetailOtherNews(dispatch, payload))
			)
			.catch(error =>
				dispatch(failNewsDetailOtherNews(error))
			);
	}
};