import * as types from '../actionTypes';

const initialState = {
	data: undefined,
	pageNum: null,
	totalPages: null,
	news: undefined,
	ephemera: undefined,
	isLoading: false,
	error: undefined,
	// specific ghostContent pages
	aboutPage: undefined,
	supportUsPage: undefined,
    tourPage: undefined,
    pressPage: undefined,
	introTextPage: undefined
};

function parsePageData (meta) {

}

const ghostReducer = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_GHOST_CONTENT:
				return {
					...state,
					isLoading: true,
					error: undefined
				};
		case types.RECEIVED_GHOST_CONTENT:
			return {
				...state,
				isLoading: false,
				error: undefined,
				data: action.data,
				pageNum: action.meta.pagination.page,
				totalPages: action.meta.pagination["pages"],
			};
        case types.RECEIVED_GHOST_EPHEMERA:
            console.log(action);
            return {
                ...state,
                isLoading: false,
                error: undefined,
                ephemera: action.data,
                pageNum: action.meta.pagination.page,
                totalPages: action.meta.pagination["pages"],
            };
        case types.ADD_GHOST_EPHEMERA:
            console.log(action);
            return {
                ...state,
                isLoading: false,
                error: undefined,
                ephemera: (state.ephemera || []).concat(action.data),
                pageNum: action.meta.pagination.page,
                totalPages: action.meta.pagination["pages"],
            };
        case types.RECEIVED_GHOST_NEWS:
            console.log(action);
            return {
				...state,
				isLoading: false,
				error: undefined,
				news: action.data,
                pageNum: action.meta.pagination.page,
                totalPages: action.meta.pagination["pages"],
            };
        case types.ADD_GHOST_NEWS:
            console.log(action);
            return {
                ...state,
                isLoading: false,
                error: undefined,
                news: (state.news || []).concat(action.data),
                pageNum: action.meta.pagination.page,
                totalPages: action.meta.pagination["pages"],
            };
		case types.RECEIVED_GHOST_PAGE_ABOUT:
			return {
				...state,
				aboutPage: action.data && action.data[0]
			};
		case types.RECEIVED_GHOST_PAGE_SUPPORT_US:
			return {
				...state,
				supportUsPage: action.data && action.data[0]
			};
        case types.RECEIVED_GHOST_PAGE_TOUR:
            return {
                ...state,
                tourPage: action.data && action.data[0]
            };
        case types.RECEIVED_GHOST_PAGE_PRESS:
			return {
				...state,
				pressPage: action.data && action.data[0]
			};
		case types.RECEIVED_GHOST_PAGE_INTRO_TEXT:
			return {
				...state,
				introTextPage: action.data && action.data[0]
			};
		case types.FAILED_GHOST_CONTENT:
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

export default ghostReducer;