import * as types from '../actionTypes';

const initialState = {
	data: null,
	isLoading: false,
	error: null,
	collectionItems: null
};

const typeAheadChoices = (state=initialState, action) => {
	switch (action.type) {
		case types.FETCH_CHOICES:
				return {
					isLoading: true,
					error: null,
					collectionItems: null
				};
		case types.RECEIVED_CHOICES:
			return {
				isLoading: false,
				error: null,
				data: action.data,
				collectionItems: action.collectionItems
			};
		case types.FAILED_CHOICES:
			return {
				isLoading: false,
				error: action.error,
				data: null,
				collectionItems: null
			};
		default:
			return state;
	}
};

export default typeAheadChoices;