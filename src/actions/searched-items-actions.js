import {
	FETCH_SEARCHED_ITEMS,
	RECEIVED_SEARCHED_ITEMS,
	FAILED_SEARCHED_ITEMS,
	CLEAR_FILTERED_ITEMS
} from '../actionTypes';
import { config } from '../store';
import {getItemTypeFromRefName} from '../utils/parse-data';

const collectionPath = '/personauthorities';
const collectionId = '5b2486be-bc1f-4176-97fa';

function fetchSearchedItems() {
	return {
		type: FETCH_SEARCHED_ITEMS
	}
}

function clearFilteredItems() {
    return {
        type: CLEAR_FILTERED_ITEMS
    }
}

function receiveSearchedItems(dispatch, dataWithItemType, totalCount, pageCount, collectionItems, searchedText) {
	return {
		type: RECEIVED_SEARCHED_ITEMS,
		data: dataWithItemType,
		collectionItems,
		searchedText,
		totalCount,
		pageCount
	}
}

function failSearchedItems(error) {
	console.error('Failed SearchedItems Request', error);
	return {
		type: FAILED_SEARCHED_ITEMS,
		error
	}
}

const NUM_ROWS = 13;
const NUM_PER_ROW = 3;


export function getSearchedItems(collectionItems, searchText) {
	const queryParams = {
		pgSz: NUM_PER_ROW * NUM_ROWS,
		kw: searchText
	};
	return (dispatch) => {
		dispatch(fetchSearchedItems());
        dispatch(clearFilteredItems());
        const makeRequest = collectionItems ?
			() => config.fetchItemChoices(collectionItems, queryParams) :
			() => config.fetchAllChoices(queryParams);
		return makeRequest()
			.then(choiceData => {
				const { choices, totalCount, pageCount } = choiceData;
				// since choices can vary by item type, attach it here
				// and listen for it on Search Cards/Collection Sections]
				const dataWithItemType = choices.map(d => {
					d.itemType = getItemTypeFromRefName(d.refName);
					if (collectionItems === 'events' || collectionItems === 'programs') {
                        d.rtSbj = d.csid;
                        d.mediaIsByRtSbj = true;
                    }
					return d;
				});
				dispatch(receiveSearchedItems(dispatch, dataWithItemType, totalCount, pageCount, collectionItems, searchText))
			})
			.catch(error =>
				dispatch(failSearchedItems(error))
			);
	}
};