import * as types from '../actionTypes';
import otherNews from './news-detail-other-news-reducer';

const initialState = {
	data: {},
	isLoading: false,
	error: undefined,
	otherNews: undefined
};

const newsDetailReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_NEWS_DETAIL:
				return {
					...state,
					isLoading: true,
					error: undefined,
					otherNews: otherNews(state.otherNews, action)
				};
		case types.RECEIVED_NEWS_DETAIL:
			return {
				...state,
				isLoading: false,
				error: undefined,
				data: action.data,
				otherNews: otherNews(state.otherNews, action)
			};
		case types.FAILED_NEWS_DETAIL:
			return {
				...state,
				isLoading: false,
				error: action.error,
				data: undefined,
				otherNews: otherNews(state.otherNews, action)
			};
		default:
			return {
				...state,
				otherNews: otherNews(state.otherNews, action)
			};
	}
};

export default newsDetailReducer;