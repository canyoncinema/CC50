import {
    FETCH_FILTERED_ITEMS,
    RECEIVED_FILTERED_ITEMS,
    FAILED_FILTERED_ITEMS
} from '../actionTypes';
import { config } from '../store';
import { getItemTypeFromRefName, parseFilm } from '../utils/parse-data';

function fetchFilteredItems() {
    return {
        type: FETCH_FILTERED_ITEMS
    }
}

function receiveFilteredItems(dispatch, dataWithItemType, totalCount, pageCount, collectionItems, filtersDisabled) {
    return {
        type: RECEIVED_FILTERED_ITEMS,
        data: dataWithItemType,
        collectionItems,
        totalCount,
        pageCount,
        filtersDisabled
    }
}

function failFilteredItems(error) {
    console.error('Failed FilteredItems Request', error);
    return {
        type: FAILED_FILTERED_ITEMS,
        error
    }
}

const NUM_ROWS = 13;
const NUM_PER_ROW = 3;

export function getFilteredItems(collectionItems, filtersDisabled, searchedText) {
    const queryParams = {
        pgSz: NUM_PER_ROW * NUM_ROWS,
        kw: searchedText
    };

    return (dispatch) => {
        dispatch(fetchFilteredItems());
        const hasActiveFilter = Object.values(filtersDisabled).some(val => val === true);
        const makeRequest = hasActiveFilter ?
            () => config.fetchFilteredItems({filtersDisabled, collectionItems, queryParams}) :
            () => config.fetchItemChoices(collectionItems, queryParams)
        return makeRequest()

        .then(choiceData => {
            const { choices, totalCount, pageCount } = choiceData;
            console.log("RETURNED", choices);
            // since choices can vary by item type, attach it here
            // and listen for it on Search Cards/Collection Sections
            const dataWithItemType = choices.map(d => {
                d.itemType = getItemTypeFromRefName(d.refName);
                return d;
            });
            dispatch(receiveFilteredItems(dispatch, dataWithItemType, totalCount, pageCount, collectionItems, filtersDisabled))
        })
        .catch(error =>
            dispatch(failFilteredItems(error))
        );
    }
};