import {
	FETCH_SEARCHED_ITEMS,
	RECEIVED_SEARCHED_ITEMS,
	FAILED_SEARCHED_ITEMS
} from '../actionTypes';
import { config } from '../store';
import { parseFilm } from '../utils/parse-data';

const collectionPath = '/personauthorities';
const collectionId = '5b2486be-bc1f-4176-97fa';

function fetchSearchedItems() {
	return {
		type: FETCH_SEARCHED_ITEMS
	}
}

function receiveSearchedItems(choices, totalCount, pageCount, collectionItems, searchedText) {
	return {
		type: RECEIVED_SEARCHED_ITEMS,
		data: choices,
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

export function getSearchedItems(collectionItems, searchText) {
	const queryParams = {
		pgSz: 40,
		kw: searchText
	};
	console.log('getSearchedItems', collectionItems, searchText);
	return (dispatch) => {
		dispatch(fetchSearchedItems());
		const makeRequest = collectionItems ?
			() => config.fetchItemChoices(collectionItems, queryParams) :
			() => config.fetchAllChoices(queryParams);
		return makeRequest()
			.then(choiceData => {
				const { data, totalCount, pageCount } = choiceData;
				dispatch(receiveSearchedItems(data, totalCount, pageCount, collectionItems, searchText))
			})
			.catch(error =>
				dispatch(failSearchedItems(error))
			);
	}
};