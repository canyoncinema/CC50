import * as types from '../actionTypes';

const initialState = {
	data: undefined,
	isLoading: false,
	error: undefined,
	// specific news pages
	aboutPage: undefined,
	supportUsPage: undefined,
    tourPage: undefined,
    pressPage: undefined,
	introTextPage: undefined
};

const newsReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_NEWS:
				return {
					...state,
					isLoading: true,
					error: undefined
				};
		case types.RECEIVED_NEWS:
			return {
				...state,
				isLoading: false,
				error: undefined,
				data: action.data
			};
		case types.RECEIVED_NEWS_PAGE_ABOUT:
			return {
				...state,
				aboutPage: action.data && action.data[0]
			};
		case types.RECEIVED_NEWS_PAGE_SUPPORT_US:
			return {
				...state,
				supportUsPage: action.data && action.data[0]
			};
        case types.RECEIVED_NEWS_PAGE_TOUR:
            return {
                ...state,
                tourPage: action.data && action.data[0]
            };
        case types.RECEIVED_NEWS_PAGE_PRESS:
			return {
				...state,
				pressPage: action.data && action.data[0]
			};
		case types.RECEIVED_NEWS_PAGE_INTRO_TEXT:
			return {
				...state,
				introTextPage: action.data && action.data[0]
			};
		case types.FAILED_NEWS:
			return {
				...state,
				isLoading: false,
				error: action.error,
				data: undefined
			};
		default:
			return state;
	}
};

export default newsReducer;