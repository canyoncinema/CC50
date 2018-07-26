export const parseCreator = creator =>
	creator &&
	creator.match(/\'(.+)\'$/) &&
	creator.match(/\'(.+)\'$/)[1];

export const toExternalWebUrl = url => {
  if (url.indexOf('://') != -1) {
  	// is valid external link already
  	return url;
  }
  return '//' + url;
}
const ORIGINAL_PHOTO_SIZE_SUFFIX = 'o';
// available sizes:
// 80x60
// 170x128
// 360x270
export const blobCsidToSrc = (blobCsid, size) =>
	`http://cc50-test-1.azureedge.net/thumbs/${blobCsid}${size ? '_' + size : ORIGINAL_PHOTO_SIZE_SUFFIX}.jpeg`;

export const toItemData = (payload) => {
	// expect item payload from CollectionSpace
	// TODO: MARKDOWN RENDERING
	const name = payload.document['@name'];
	const commonField = 'ns2:' + name + '_common';
	const canyonField = 'ns2:' + name + '_canyon';
	const data = Object.assign(payload.document[commonField], payload.document[canyonField]);
	if (data.refName) data.termDisplayName = toDisplayName(data.refName);
	return data;
};

export const toItemsData = (payload, skipTermDisplayName) => {
	let data = payload['ns2:abstract-common-list'];
	if (data.itemsInPage == 0) return [];
	if (data.itemsInPage == 1) {
		data = [data['list-item']];
	} else {
		data = data['list-item'];
	}
	if (data.length && !skipTermDisplayName) {
		data = data.map(d => {
			if (d.refName) d.termDisplayName = toDisplayName(d.refName);
			return d;
		});
	}
	return data;
}

export const toTotalCount = (payload) => {
	return Number(payload['ns2:abstract-common-list'].totalItems);
};

export const toPageCount = (payload) => {
	return Number(payload['ns2:abstract-common-list'].itemsInPage);
};

export const parseFilm = film => {
	film.creator = parseCreator(film.creator);
	return film;
};

export const matchRefName = refName => {
	return refName.match(/^urn\:cspace\:canyoncinema.com\:(\S+)\:name(\S+)\:item\:name\((\S+)\)\'(.+)\'$/);
};

export const getCspaceCllxnFromRefName = (refName, match) => {
	// e.g. 'workauthorities'
	return match ? match[1] : matchRefName(refName)[1];
};

export const getDisplayNameFromRefName = (refName, match) => {
	// e.g. 'Stan Brakhage'
	return match ? match[4] : matchRefName(refName)[4];
};

export const getShortIdentifierFromRefName = (refName, match) => {
	// e.g. 'film_16mm' or 'TheDead1529309019213'
	return match ? match[3] : matchRefName(refName)[3];
};

export function toDisplayName(refName) {
	return refName.match(/\'(.+)\'$/)[1];
}

export const getDisplayNameFromMatch = (match) => {
	// e.g. 'Stan Brakhage'
	return match[4];
};

// TODO: get film year exposed on media item (Nima)
export const fullSizedCarouselCaption = mediaItem =>
	mediaItem.filmSubject ?
	getDisplayNameFromRefName(mediaItem.filmSubject) :
	'';

export const fullSizedCarouselCaptionLink = mediaItem =>
	mediaItem.filmSubject ?
	`/collection/films/${getShortIdentifierFromRefName(mediaItem.filmSubject)}` :
	'';

export const getShortIdentifierFromMatch = (match) => {
	// e.g. 'film_16mm' or 'TheDead1529309019213'
	return match[3];
};

export const collectionItemsToItemName = (collectionItems, isPlural) => {
	switch (collectionItems) {
		case 'films':
			return isPlural ? 'works' : 'work';
		case 'filmmakers':
			return isPlural ? 'persons' : 'person';
		case 'ephemera':
			return null;
		case 'events':
			return 'exhibitions';
		default:
			return;
	}
};

export const collectionItemsToCSpaceCollection = (collectionItems, isRefName, isPlural) => {
	switch (collectionItems) {
		case 'films':
			return isRefName ? isPlural ? 'works' : 'work' : 'workauthorities';
		case 'filmmakers':
			return isRefName ? isPlural ? 'persons' : 'person' : 'personauthorities';
		case 'ephemera':
			return isRefName ? isPlural ? 'collectionobjects' : 'collectionobject' : 'collectionobjects';
			// admin@canyoncinema.com:Administrator -H "Accept: application/json" "http://cs.cancf.com/cspace-services/collectionobjects"
			// NOTE: FILTER FOR EPHEMERA( from Nima )
		case 'programs':
			return isRefName ? isPlural ? 'groups' : 'group' : 'groups';
		case 'events':
			return isRefName ? isPlural ? 'exhibitions' : 'exhibition' : 'exhibitions';
		default:
			return;
	}
};

export const cspaceCollectionToItemName = (cspaceCollection, isPlural) => {
	switch (cspaceCollection) {
		case 'workauthorities':
			return isPlural ? 'works' : 'work';
		case 'work':
			return isPlural ? 'works' : 'work';
		case 'works':
			return isPlural ? 'works' : 'work';
		case 'personauthorities':
			return isPlural ? 'persons' : 'person';
		case 'person':
			return isPlural ? 'persons' : 'person';
		case 'persons':
			return isPlural ? 'persons' : 'person';
		case 'ephemera':
			return null;
		case 'events':
			return 'exhibitions';
		default:
			return;
	}
};

export const cspaceCollectionToItemType = (cspaceCollection, isPlural) => {
	switch (cspaceCollection) {
		case 'workauthorities':
			return 'film';
		case 'work':
			return 'film';
		case 'works':
			return 'film';
		case 'personauthorities':
			return 'filmmaker';
		case 'person':
			return 'filmmaker';
		case 'persons':
			return 'filmmaker';
		case 'collectionobjects':
			return 'ephemera';
		case 'collectionobject':
			return 'program';
		case 'ephemera':
			return 'ephemera';
		case 'exhibitions':
			return 'event';
		default:
			return;
	}
};

export const getItemTypeFromRefName = refName => {
	return cspaceCollectionToItemType(getCspaceCllxnFromRefName(refName));
}


export const getNameFromFilmFormat = formatRefName => {
	const formatShortIdentifier = getShortIdentifierFromRefName(formatRefName);
	if (formatShortIdentifier === 'film_16mm') return '16mm';
	if (formatShortIdentifier === 'film_35mm') return '16mm';
	if (formatShortIdentifier === 'film_8mm') return '16mm';
	if (formatShortIdentifier === 'file') return 'File';
	if (formatShortIdentifier === 'dvd') return 'DVD';
	if (formatShortIdentifier === 'dvd_ntsc') return 'NTSC DVD';
	if (formatShortIdentifier === 'vhs_ntsc') return 'NTSC VHS';
	if (formatShortIdentifier === 'dvd_pal') return 'PAL DVD';
	if (formatShortIdentifier === 'vhs_pal') return 'PAL VHS';
	if (formatShortIdentifier === 'film_super_8mm') return 'Super 8mm';
	if (formatShortIdentifier === 'vhs') return 'VHS';
	console.error('Unhandled file format ' + formatShortIdentifier);
	return formatShortIdentifier;
}

export const getFilmColor = (color) => {
	if (color === 'color') return 'Color';
	if (color === 'b_w') return 'Black/White';
	// Discussed: the color_b_w option should not be used at all
	// Must pick one. Default to "Color"
	if (color === 'color_b_w') return 'Color';
	return color;
}

export const getFilmSound = sound => {
	if (sound === 'silent') return 'Silent';
	if (sound === 'sound') return 'Sound';
}

export const yearsFromYear = (displayYears, earliestYear, latestYear) => {
	if (displayYears.length === 4) {
		// exact year. SPEC: return decade it is in
		return [String(Math.floor(Number(displayYears)/10) * 10) + 's'];
	} else {
		// multi-year, e.g. a trilogophy released across 2004-2011
		// SPEC: display exact display years, e.g. "2004-2011"
		return displayYears;
	}
}

export const collectionItemsToSingularTitlecased = label => {
	if (label === 'filmmakers') return 'Filmmaker';
	if (label === 'films') return 'Film';
	if (label === 'programs') return 'Program';
	if (label === 'ephemera') return 'Ephemera';
	throw new Error('Invalid label ' + label);
};
