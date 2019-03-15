import {
    FETCH_PROGRAMS,
    RECEIVED_PROGRAMS,
    FAILED_PROGRAMS
} from '../actionTypes';
import { config } from '../store';
import { parseFilm, toItemsData } from '../utils/parse-data';
import { getItemsMedia } from './items-media-actions';
import { wrappedFetch } from '../config';

const collectionPath = '/personauthorities';
const collectionId = '5b2486be-bc1f-4176-97fa';

function fetchPrograms() {
    return {
        type: FETCH_PROGRAMS
    }
}

function receivePrograms(dispatch, payload) {
    const items = toItemsData(payload);
    // return up to 3 film stills per film item
    // and indicate num of stills per film (for carousel 'see more')
    items.forEach(item => {
        dispatch(getItemsMedia({ item }));
    });
    return {
        type: RECEIVED_PROGRAMS,
        data: items
    }
}

function failPrograms(error) {
    console.error('Failed Programs Request', error);
    return {
        type: FAILED_PROGRAMS,
        error
    }
}

export function getPrograms(queryParams) {
    return (dispatch) => {
        dispatch(fetchPrograms());
        return wrappedFetch(config.listProgramsUrl(queryParams))
            .then(response => {
                if (response.status >= 400) {
                    dispatch(failPrograms("Bad response from server"));
                }
                return response.json();
            })
            .then(data =>
                dispatch(receivePrograms(dispatch, data))
            )
            .catch(error =>
                dispatch(failPrograms(error))
            );
    }
};