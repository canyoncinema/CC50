import * as types from '../actionTypes';

const initialState = {
    data: undefined,
    isLoading: false,
    error: undefined,
    films: undefined,
    filtersDisabled: {},
    totalCount: 0
};

const filteredItems = (state=initialState, action) => {
    switch (action.type) {
        case types.CLEAR_FILTERED_ITEMS:
            return {
                isLoading: false,
                filtersDisabled: {},
            };
        case types.FETCH_FILTERED_ITEMS:
            return {
                isLoading: true,
                error: undefined,
                data: undefined
            };
        case types.RECEIVED_FILTERED_ITEMS:
            return {
                isLoading: false,
                error: undefined,
                data: action.data,
                filtersDisabled: action.filtersDisabled,
                totalCount: action.totalCount,
                pageCount: action.pageCount
            };
        case types.FAILED_SEARCHED_ITEMS:
            return {
                isLoading: false,
                error: action.error,
                data: undefined
            };
        default:
            return state;
    }
};

export default filteredItems;