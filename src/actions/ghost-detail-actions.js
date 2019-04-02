import {
	FETCH_NEWS_DETAIL,
	RECEIVED_NEWS_DETAIL,
	FAILED_NEWS_DETAIL,
	FETCH_NEWS_DETAIL_OTHER_NEWS,
	RECEIVED_NEWS_DETAIL_OTHER_NEWS,
	FAILED_NEWS_DETAIL_OTHER_NEWS
} from '../actionTypes';
import { config } from '../store';
import { toNewsItemData } from '../utils/parse-data';

function fetchNewsDetail() {
	return {
		type: FETCH_NEWS_DETAIL
	}
}

function receiveNewsDetail(dispatch, payload) {
	const item = toNewsItemData(payload.posts && payload.posts[0]); // TODO
	return {
		type: RECEIVED_NEWS_DETAIL,
		data: item
	}
}

function failNewsDetail(error) {
	console.error('Failed NewsDetail Request', error);
	return {
		type: FAILED_NEWS_DETAIL,
		error
	}
}

export function getNewsDetail({ slug }) {
	return (dispatch) => {
		dispatch(fetchNewsDetail());
		return config.retrieveNewsDetail({
			slug
		})
			.then(response => {
				if (response.status >= 400) {
					dispatch(failNewsDetail("Bad response from server"));
				}
				return response.json();
			})
			.then(payload =>
				dispatch(receiveNewsDetail(dispatch, payload))
			)
			.catch(error =>
				dispatch(failNewsDetail(error))
			);
	}
};