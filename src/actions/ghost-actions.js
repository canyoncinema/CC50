import {
    FETCH_GHOST_CONTENT,
    RECEIVED_GHOST_CONTENT,
    RECEIVED_GHOST_EPHEMERA,
    RECEIVED_GHOST_NEWS,
    ADD_GHOST_CONTENT,
    ADD_GHOST_EPHEMERA,
    ADD_GHOST_NEWS,
    FAILED_GHOST_CONTENT
} from '../actionTypes';
import { config } from '../store';
import {toItemsData, toNewsItemsData, toPageCount, toPageNum, toTotalCount} from '../utils/parse-data';
import {getEvents} from "./events-actions";
import {getItems} from "./items-actions";

function fetchGhostContent() {
	return {
		type: FETCH_GHOST_CONTENT
	}
}

function receiveGhostContent(dispatch, payload, receiveActionType) {
	const items = toNewsItemsData(payload.posts);
	return {
		type: receiveActionType || RECEIVED_GHOST_CONTENT,
		data: items,
		meta: payload.meta
	}
}

function addGhostContent(dispatch, payload, addActionType) {
    const items = toNewsItemsData(payload.posts);
    return {
        type: addActionType || ADD_GHOST_CONTENT,
        data: items,
        meta: payload.meta
    }
}


function failGhostContent(error) {
	console.error('Failed News Request', error);
	return {
		type: FAILED_GHOST_CONTENT,
		error
	}
}

export function getGhostContent(queryParams, receiveActionType, shouldAddGhostContent=false) {
	return (dispatch) => {
		dispatch(fetchGhostContent());
		return config.listGhostContent(queryParams)
			.then(response => {
				if (response.status >= 400) {
					dispatch(failGhostContent("Bad response from server"));
				}
				return response.json();
			})
			.then(payload => {
                if (shouldAddGhostContent) {
                    if (queryParams.type === 'ephemera') {
                        dispatch(addGhostContent(dispatch, payload, ADD_GHOST_EPHEMERA))
                    } else if (queryParams.type === 'news') {
                        dispatch(addGhostContent(dispatch, payload, ADD_GHOST_NEWS))
                    } else {
                        dispatch(addGhostContent(dispatch, payload, receiveActionType))
                    }
				} else {
                    if (queryParams.type === 'ephemera') {
                        dispatch(receiveGhostContent(dispatch, payload, RECEIVED_GHOST_EPHEMERA))
                    } else if (queryParams.type === 'news') {
                        dispatch(receiveGhostContent(dispatch, payload, RECEIVED_GHOST_NEWS))
                    } else {
                        dispatch(receiveGhostContent(dispatch, payload, receiveActionType))
                    }
                }
            })
			.catch(error =>
				dispatch(failGhostContent(error))
			);
	}
};


let initializingAppendGhostContent = false;

export function appendGhostContent(queryParams, receiveActionType, pageNum=0) {
    return dispatch => {
        if (initializingAppendGhostContent) return Promise.resolve(true);
        initializingAppendGhostContent = true;
        return dispatch(getGhostContent(queryParams, pageNum, true))
            .then(() => {
                initializingAppendGhostContent = false;
            });
    };
};
