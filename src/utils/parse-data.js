function toGhostSrc(src) {
	return src.match(/\:\/\//) ?
		src : `https://ghost.cancf.com${src}`;
}

export function convertGhostHtml(ghostHtml) {
	// for every image src instance, replace to include ghost domain
	const strings = ghostHtml.match(/src=\"(\S+)\"/g);
	if (strings) {
		strings.forEach(str => {
			const match = str.match(/src=\"(\S+)\"/);
			const srcVal = match[1];
			ghostHtml = ghostHtml.replace(str, 'src="' + toGhostSrc(srcVal) + '"');
		});
	}
	return ghostHtml;
}

export function toNewsItemData(item) {
	return {
		...item,
		id: item.id,
		title: item.title,
		published_at: item.published_at,
		publishedAt: new Date(item.published_at),
		author: item.primary_author ?
			item.primary_author.name : item.authors && item.authors.length ?
			item.authors.map(a => a.name).join(', ') : '', 
		featureImage: item.feature_image && toGhostSrc(item.feature_image),
		slug: item.slug,
		tags: item.tags && item.tags.map(tag => tag.name),
		html: item.html && convertGhostHtml(item.html),
		status: item.status
	}
}
export function toNewsItemsData(items) {
	return items.map(toNewsItemData);
}

function getEventFilms(filmRefNames) {
	return (filmRefNames || []).map(filmRefName => ({
		termDisplayName: getDisplayNameFromRefName(filmRefName),
		shortIdentifier: getShortIdentifierFromRefName(filmRefName),
		refName: filmRefName
	}));
}

export const addEventFields = (item,filmRefNames) => {
	// TODO: price string
	item.price = null;
	const showingGroup = parseExhibitionShowingGroup(item);
	// without these replaces, date conversion in JS is a day off...hack...
    item.showingOpeningDate = item.showingOpeningDate || (parseExhibitionOpeningDate(item, showingGroup)).replace(/-/g, '\/').replace(/T.+/, '');
	item.showingOpeningTime = item.showingOpeningTime || parseExhibitionOpeningTime(item, showingGroup);
    item.showingClosingDate = item.showingClosingDate || parseExhibitionOpeningDate(item, showingGroup);
	item.showingClosingTime = item.showingClosingTime || parseExhibitionClosingTime(item, showingGroup);
	item.showingTicketUrl = item.showingTicketUrl || parseExhibitionTicketUrl(item, showingGroup);
	item.showingPrice = item.showingPrice || parseExhibitionPrice(item, showingGroup);

	item.venueDisplayName = item.showingLocation ? getDisplayNameFromRefName(item.showingLocation) : parseExhibitionVenueDisplayName(item, showingGroup);
	// item.venueUrl = parseExhibitionVenueUrl(item, venueGroup);
	// TODO: differ date from dateTime (incl. midnight)
	if (filmRefNames) {
        item.films = getEventFilms(filmRefNames);
    }
    // TODO such a hack.
    if (item.title.length > 40) {
        item.shortTitle = item.title.substring(0, 40) + '...';
    } else {
        item.shortTitle = item.title;
    }
    return item;
}

export const parseCreator = creatorRefName =>
	creatorRefName &&
	creatorRefName.match(/\'(.+)\'$/) &&
	creatorRefName.match(/\'(.+)\'$/)[1];

export const parseCreatorRefName = item =>
	item &&
	item.creatorGroupList &&
	item.creatorGroupList.creatorGroup &&
	item.creatorGroupList.creatorGroup.creator;

export const parseItemCreator = item =>
	item &&
	item.creatorGroupList &&
	item.creatorGroupList.creatorGroup &&
	item.creatorGroupList.creatorGroup.creator &&
	parseCreator(item.creatorGroupList.creatorGroup.creator);

export function parseItemWorks(type, item) {
	if (item &&
		item[type + "WorkGroupList"] &&
		item[type + "WorkGroupList"][type + "WorkGroup"]) {
		if (item[type + "WorkGroupList"][type + "WorkGroup"].length) {
            return item[type + "WorkGroupList"][type + "WorkGroup"].map(x => x[type + "Work"])
        }

        // CSpace API doesn't return an array if there's only 1 item -- need to convert as a workaround
        if (item[type + "WorkGroupList"][type + "WorkGroup"][type + "Work"]) {
        	let singleWork = item[type + "WorkGroupList"][type + "WorkGroup"][type + "Work"];
        	if (typeof singleWork === "string") {
        		return [singleWork];
			}
		}
		return null;
	}
}

//@marlo replaced this w above more general function
export const parseItemExhibitionWorks = item =>
	item &&
	item.exhibitionWorkGroupList &&
	item.exhibitionWorkGroupList.exhibitionWorkGroup &&
	item.exhibitionWorkGroupList.exhibitionWorkGroup.length ?
		item.exhibitionWorkGroupList.exhibitionWorkGroup.map(x => x.exhibitionWork) :
		null;

	/* EXAMPLE: FOR 2 OR MORE
	"exhibitionWorkGroupList": {
    "exhibitionWorkGroup": [
      {
        "exhibitionWork": "urn:cspace:canyoncinema.com:workauthorities:name(work):item:name(ReleasingHumanEnergies1529513486096)'Releasing Human Energies'"
      },
      {
        "exhibitionWork": "urn:cspace:canyoncinema.com:workauthorities:name(work):item:name(WhatisaMan1529514241097)'What is a Man?'"
      },
      {
        "exhibitionWork": "urn:cspace:canyoncinema.com:workauthorities:name(work):item:name(Associations1529514649225)'Associations'"
      },
      {
        "exhibitionWork": "urn:cspace:canyoncinema.com:workauthorities:name(work):item:name(HotLeatherette1529449911276)'Hot Leatherette'"
      }
    ]
  }
  ->>  [
  	"urn:cspace:canyoncinema.com:workauthorities:name(work):item:name(ReleasingHumanEnergies1529513486096)'Releasing Human Energies'",
  	"urn:cspace:canyoncinema.com:workauthorities:name(work):item:name(WhatisaMan1529514241097)'What is a Man?'",
  	...
  ]
	 */

export const parseExhibitionShowingGroup = exhibition =>
	exhibition &&
	exhibition.showingGroupList &&
	exhibition.showingGroupList.showingGroup &&
	(exhibition.showingGroupList.showingGroup.length ? exhibition.showingGroupList.showingGroup[0] : exhibition.showingGroupList.showingGroup);

export const parseExhibitionOpeningDate = (exhibition, showingGroup=parseExhibitionShowingGroup(exhibition)) => {
    return showingGroup && showingGroup.showingOpeningDate;
}


export const parseExhibitionOpeningTime = (exhibition, showingGroup=parseExhibitionShowingGroup(exhibition)) =>
	showingGroup && showingGroup.showingOpeningTime;

export const parseExhibitionClosingDate = (exhibition, showingGroup=parseExhibitionShowingGroup(exhibition)) =>
	showingGroup && showingGroup.showingClosingDate;

export const parseExhibitionClosingTime = (exhibition, showingGroup=parseExhibitionShowingGroup(exhibition)) =>
	showingGroup && showingGroup.showingClosingTime;

export const parseExhibitionTicketUrl = (exhibition, showingGroup=parseExhibitionShowingGroup(exhibition)) =>
	showingGroup && showingGroup.showingTicketUrl;

export const parseExhibitionPrice = (exhibition, showingGroup=parseExhibitionShowingGroup(exhibition)) =>
	showingGroup && showingGroup.showingPrice;

export const parseExhibitionVenueGroup = exhibition =>
	exhibition &&
	exhibition.venueGroupList &&
	exhibition.venueGroupList.venueGroup;

export const parseExhibitionVenueRefName = (exhibition, venueGroup=parseExhibitionShowingGroup(exhibition)) =>
	venueGroup && venueGroup.venue;

export const parseExhibitionVenueDisplayName = (exhibition, showingGroup=parseExhibitionShowingGroup(exhibition)) => {
	const refName = showingGroup && showingGroup.showingLocation;
	return refName && getDisplayNameFromRefName(refName);
};

export const parseExhibitionVenueUrl = (exhibition, venueGroup=parseExhibitionShowingGroup(exhibition)) =>
	venueGroup && venueGroup.venueUrl;

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
	`https://cc50-test-1.azureedge.net/thumbs/${blobCsid}${size ? '_' + size : ORIGINAL_PHOTO_SIZE_SUFFIX}.jpeg`;

export const toItemData = (payload) => {
	// expect item payload from CollectionSpace
	// TODO: MARKDOWN RENDERING
	// TODO: what if there are conflicting/same fields in common, canyon, and/or core? Make sure not to overwrite.
	const name = payload.document['@name'];
	const commonField = 'ns2:' + name + '_common';
	const canyonField = 'ns2:' + name + '_canyon';
    let data = Object.assign(payload.document[commonField], payload.document[canyonField]);

    const isRtSbj = name === 'groups' || name === 'exhibitions';
    if (isRtSbj) {
        const coreField = 'ns2:collectionspace_core';
        data = {...data, ...payload.document[coreField]}
    }

	if (!isRtSbj && data.refName) data.termDisplayName = toDisplayName(data.refName);
	if (data.title) data.termDisplayName = data.title;
	return data;
};

// TODO use skipTermDisplayName instead of d.title check
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
			// added this for curated programs
			if (d.title) {
                d.termDisplayName = d.title;
			} else if (d.refName) {
            	 d.termDisplayName = toDisplayName(d.refName);
			}
			// TODO remove and used ClampedDescription component
			if (d.scopeNote) {
				d.scopeNote = d.scopeNote.substring(0, 160) + '...';
			}
			// TODO such a hack.
			if (d.termDisplayName.length > 40) {
                d.shortTitle = d.termDisplayName.substring(0, 40) + '...';
			} else {
                d.shortTitle = d.termDisplayName;
            }

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

export const toPageNum = (payload) => {
	return Number(payload['ns2:abstract-common-list'].pageNum);
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

export const getShortIdentifierFromRefName = (refName, match, nullVal) => {
	// e.g. 'film_16mm' or 'TheDead1529309019213'
	// replace with nullVal if none returned
	// if it's a group aka curated program
    if (refName.match(/^urn\:cspace\:canyoncinema.com\:groups/)) {
        return null;
    }
	try {
		return match ? match[3] : matchRefName(refName)[3];
	}

	catch(e) {
		return nullVal;
	}
};

export const getCsidFromRefName = refName =>
	// e.g. 'urn:cspace:canyoncinema.com:exhibitions:id(1d157bfe-e1f3-4acf-8aa5)'
	// => '1d157bfe-e1f3-4acf-8aa5'
	refName.match(/\:id\((\S+)\)/)[1];

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
        case 'program':
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
    if (refName.match(/^urn\:cspace\:canyoncinema.com\:groups/)) {
        return 'program';
    }
    if (refName.match(/^urn\:cspace\:canyoncinema.com\:exhibitions/)) {
        return 'events';
    }
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
