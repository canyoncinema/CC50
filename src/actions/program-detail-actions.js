import {
    FETCH_PROGRAM_DETAIL,
    RECEIVED_PROGRAM_DETAIL,
    FAILED_PROGRAM_DETAIL
} from '../actionTypes';
import { config } from '../store';
import { parseFilm, getCsidFromRefName, toItemData,
    parseItemExhibitionWorks,
    parseExhibitionVenueGroup, parseExhibitionVenueUrl, parseExhibitionVenueDisplayName,
    parseExhibitionStartTime, parseExhibitionEndTime,
    getDisplayNameFromRefName, getShortIdentifierFromRefName,
    addEventFields
} from '../utils/parse-data';
import { getItemsMedia } from './items-media-actions';
import { getEventDetailFilms } from './event-detail-films-actions';
import { wrappedFetch } from '../config';
import { MAX_CAROUSEL_IMAGES } from '../components/Carousel/CoverCarousel';

function fetchEventDetail() {
    return {
        type: FETCH_PROGRAM_DETAIL
    }
}

function receiveEventDetail(dispatch, payload, csid) {
    const item = toItemData(payload);
    const filmRefNames = parseItemExhibitionWorks(item);
    addEventFields(item, filmRefNames);
    if (filmRefNames) {
        dispatch(getEventDetailFilms(filmRefNames));
    }
    item.mediaIsByRtSbj = true;
    item.csid = csid;
    dispatch(getItemsMedia({item, itemType: 'event'}));
    return {
        type: RECEIVED_PROGRAM_DETAIL,
        data: item
    }
}

function failEventDetail(error) {
    console.error('Failed EventDetail Request', error);
    return {
        type: FAILED_PROGRAM_DETAIL,
        error
    }
}

// export function getProgramDetail(csid) {
//     return (dispatch) => {
//         dispatch(fetchEventDetail());
//         return config.fetchEvent(csid)
//             .then(response => {
//                 if (response.status >= 400) {
//                     dispatch(failEventDetail("Bad response from server"));
//                 }
//                 return response.json();
//             })
//             .then(data =>
//                 dispatch(receiveEventDetail(dispatch, data, csid))
//             )
//             .catch(error =>
//                 dispatch(failEventDetail(error))
//             );
//     }
// };