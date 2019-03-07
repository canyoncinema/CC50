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
    // console.log('action', action);
    switch (action.type) {
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
                // disabledTags: action.disabledTags.slice or whatever the 'tagName'
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