import {
    FETCH_EVENTS_MEDIA,
    RECEIVED_EVENTS_MEDIA,
    FAILED_EVENTS_MEDIA
} from '../actionTypes';
import { config } from '../store';
import { toItemsData,
    getShortIdentifierFromRefName,
    getItemTypeFromRefName
} from '../utils/parse-data';

const fetchedMediaForEventCsids = [];

function fetchEventsMedia(shortIdentifier) {
    return {
        type: FETCH_EVENTS_MEDIA,
        shortIdentifier
    }
}

function receiveEventsMedia(csid, data) {
    fetchedMediaForEventCsids.push(csid);
    return {
        type: RECEIVED_EVENTS_MEDIA,
        csid,
        data
    };
}

function failedEventsMedia(csid, error) {
    return {
        type: FAILED_EVENTS_MEDIA,
        csid,
        error
    }
}

export function getEventsMedia({
  item,
  csid
}) {
    console.log('msid events', csid);
    // const shortIdentifier = mappedShortIdentifier || getShortIdentifierFromRefName(itemRefName);
    const queryParams = {
        pgSz: 3,
        isEvent: true,
        rtSbj: csid
    };
    return dispatch => {
        if (fetchedMediaForEventCsids.includes(csid)) return;
        return config.fetchItemMedia(queryParams)
            .then(response => {
                if (response.status >= 400) {
                    // fail silently (still return rest of page)
                    console.warn('WARNING: images could not be retrieved' +
                    item ? 'for ' + item.termDisplayName : '');
                }
                return response.json();
            })
            .then(payload => {
                const media = toItemsData(payload, true);
                // // for a film short identifier, will associate this media to that film
                // dispatch(receiveEventsMedia(shortIdentifier, media));
                // if (mappedShortIdentifier &&
                //     mappedShortIdentifier !== shortIdentifier) {
                //     // also, do not upload this still again, if on the item's item page/search card
                //     dispatch(receiveItemsMedia(getShortIdentifierFromRefName(itemRefName), media));
                // }
                // if (item && item.creator) {
                //     // also associate this film media to film's Filmmaker
                //     // allowing a filmmaker's page to have all possibly retrieved film stills
                //     // IMPORTANT: this only grabs the top 3 (via CoverCarousel media num limit)
                //     // stills per film; does not NOT grab all filmmaker's films' stills w/n collxn
                //     dispatch(receiveItemsMedia(getShortIdentifierFromRefName(item.creator), media));
                // }
            })
            .catch(err => dispatch(failedEventsMedia(csid, err)));
    }
}
