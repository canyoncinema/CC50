import {
	FETCH_ITEMS_MEDIA,
	RECEIVED_ITEMS_MEDIA,
	RECEIVED_ITEMS_MEDIA_BY_RT_SBJ,
	FAILED_ITEMS_MEDIA
} from '../actionTypes';
import { config } from '../store';
import { toItemsData,
	getShortIdentifierFromRefName,
	getItemTypeFromRefName
} from '../utils/parse-data';

const fetchedMediaForShortIdentifiers = [];
const fetchedMediaForRtSbjs = [];

function fetchItemsMedia(shortIdentifier) {
	return {
		type: FETCH_ITEMS_MEDIA,
		shortIdentifier
	}
}

function receiveItemsMediaByRtSbj({rtSbj, data}) {
    if (!!rtSbj) fetchedMediaForRtSbjs.push(rtSbj);
    // console.log('receive')
    return {
        type: RECEIVED_ITEMS_MEDIA_BY_RT_SBJ,
        rtSbj,
        data
    };
}

function receiveItemsMedia({shortIdentifier, data}) {
    if (!!shortIdentifier) fetchedMediaForShortIdentifiers.push(shortIdentifier);
    return {
		type: RECEIVED_ITEMS_MEDIA,
		shortIdentifier,
		data
	};
}

function failedItemsMedia(shortIdentifier, error) {
	return {
		type: FAILED_ITEMS_MEDIA,
		shortIdentifier,
		error
	}
}

export function getItemsMedia({
	item,
	itemRefName = item.refName,
	itemType = getItemTypeFromRefName(itemRefName),
	mappedShortIdentifier,
	mediaIsByRtSbj = item.mediaIsByRtSbj
}) {
	const shortIdentifier = mappedShortIdentifier || getShortIdentifierFromRefName(itemRefName);
	const rtSbj = mediaIsByRtSbj ? item.csid : null;

	// console.log('i-m-a item', item);

    const queryParams = {
		refName: itemRefName,
		pgSz: 3,
		isItemsMedia: itemType === 'film' || itemType === 'filmmaker',
		isByFilmmaker: itemType === 'filmmaker',
		rtSbj: rtSbj,
	};

	return dispatch => {

        if (fetchedMediaForShortIdentifiers.includes(shortIdentifier)) return;
        if (fetchedMediaForRtSbjs.includes(rtSbj)) return;

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

            if (mediaIsByRtSbj) dispatch(receiveItemsMediaByRtSbj({rtSbj: rtSbj, data: media}));

            // for a film short identifier, will associate this media to that film
            if (!mediaIsByRtSbj) dispatch(receiveItemsMedia({shortIdentifier, data: media}));

            if (mappedShortIdentifier &&
					mappedShortIdentifier !== shortIdentifier) {
				// also, do not upload this still again, if on the item's item page/search card
                dispatch(receiveItemsMedia({shortIdentifier: getShortIdentifierFromRefName(itemRefName), data: media}));
			}
			if (item && item.creator) {
				// also associate this film media to film's Filmmaker
				// allowing a filmmaker's page to have all possibly retrieved film stills
					// IMPORTANT: this only grabs the top 3 (via CoverCarousel media num limit)
					// stills per film; does not NOT grab all filmmaker's films' stills w/n collxn
                dispatch(receiveItemsMedia({shortIdentifier: getShortIdentifierFromRefName(item.creator), data: media}));
			}
		})
		.catch(err => dispatch(failedItemsMedia(shortIdentifier, err)));
	}
}
