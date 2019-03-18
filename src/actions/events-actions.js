import {
    FETCH_EVENTS,
    RECEIVED_EVENTS,
    FAILED_EVENTS, RECEIVED_FILMS, ADD_EVENTS
} from '../actionTypes';
import { config } from '../store';
import {
    parseFilm, getCsidFromRefName,
    toItemData, toItemsData,
    toTotalCount,
    parseItemWorks, getItemTypeFromRefName, addEventFields, toPageCount, toPageNum
} from '../utils/parse-data';
import { wrappedFetch } from '../config';
import { MAX_CAROUSEL_IMAGES } from '../components/Carousel/CoverCarousel';
const collectionPath = '/personauthorities';
const collectionId = '5b2486be-bc1f-4176-97fa';

function fetchEvents() {
	return {
		type: FETCH_EVENTS
	}
}

// MAX_EVENT_FILM_STILLS: show up to this many film stills, per film on an event
export const MAX_EVENT_FILM_STILLS = 3;
//
// function fetchEventMedia(eventRefName) {
// 	// return up to 3 film stills per film in the Event
// 	// NOTE: Events do not have a shortIdentifier. use its csid
// 	config.fetchEvent(getCsidFromRefName(eventRefName))
// 		.then(response => {
// 			if (response.status >= 400) {
// 				// fail silently
// 				return false;
// 			}
// 			return response.json();
// 		})
// 		.then(data => {
// 			if (data) {
//                 const filmRefNames = parseItemWorks('exhibition', toItemData(data));
//                 filmRefNames.forEach(filmRefName => getItemsMedia({
// 					itemRefName: filmRefName,
// 					itemType: 'event',
// 					mappedShortIdentifier: eventRefName
// 				}))
//
// 				// SPEC: pick 1 from each work, until up to MAX_CAROUSEL_IMAGES
//
// 			}
// 		});
// }


//
// function receiveFilms(dispatch, payload) {
//     const items = toItemsData(payload);
//     // return up to 3 film stills per film item
//     // and indicate num of stills per film (for carousel 'see more')
//     items.forEach(item => {
//         dispatch(getItemsMedia({ item }));
//     });
//     return {
//         type: RECEIVED_FILMS,
//         data: items
//     }
// }

function receiveEvents(payload) {
	let items = toItemsData(payload, true);
    const totalCount = toTotalCount(payload);
    const pageCount = toPageCount(payload);
    const pageNum = toPageNum(payload);
    items.map(e => {
        addEventFields(e)
    });
	return {
		type: RECEIVED_EVENTS,
		data: items,
		totalCount,
		pageCount,
		pageNum
	}
}

function addEvents(payload) {
    let items = toItemsData(payload, true);
    const pageCount = toPageCount(payload);
    const pageNum = toPageNum(payload);
    items.map(e => {
        addEventFields(e)
    });
    return {
        type: ADD_EVENTS,
        data: items,
        pageCount,
        pageNum
    }
}

function failEvents(error) {
	console.error('Failed Events Request', error);
	return {
		type: FAILED_EVENTS,
		error
	}
}

export function getEvents(queryParams, pageNum=0, shouldAddEvents=false) {
	return (dispatch) => {
        if (!shouldAddEvents) dispatch(fetchEvents());
        let params = {
            sortBy: 'exhibitions_canyon:showingGroupList/0/showingOpeningDate+DESC',
            wf_deleted: false,
            pgNum: pageNum,
            ...queryParams
        };
		return wrappedFetch(config.listEventsUrl(params))
			.then(response => {
				if (response.status >= 400) {
					dispatch(failEvents("Bad response from server"));
				}
				return response.json();
			})
            .then(data => {
                if (shouldAddEvents) {
                    dispatch(addEvents(data));
                } else {
                    if (data) {
                        dispatch(receiveEvents(data));
                    }
                }
            })
			.catch(error =>
				dispatch(failEvents(error))
			);
	}
}

let initializingAppendEvents = false;

export function appendEvents(queryParams, pageNum=0) {
    return dispatch => {
        if (initializingAppendEvents) return Promise.resolve(true);
        initializingAppendEvents = true;
        return dispatch(getEvents(queryParams, pageNum, true))
            .then(() => {
                initializingAppendEvents = false;
            });
    };
};
