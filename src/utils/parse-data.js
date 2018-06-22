export const parseCreator = creator =>
	creator &&
	creator.match(/\'(.+)\'$/) &&
	creator.match(/\'(.+)\'$/)[1];

export const toItemData = payload => {
	// expect item payload from CollectionSpace
	// TODO: MARKDOWN RENDERING
	const name = payload.document['@name'];
	const commonField = 'ns2:' + name + '_common';
	const canyonField = 'ns2:' + name + '_canyon';
	const data = Object.assign(payload.document[commonField], payload.document[canyonField]);
	return data;
};

export const parseFilm = film => {
	film.creator = parseCreator(film.creator);
	return film;
};

export const matchRefName = refName => {
		return refName.match(/^urn\:cspace\:canyoncinema.com\:(\S+)\:name(\S+)\:item\:name\((\S+)\)\'(.+)\'$/);
};

export const getDisplayNameFromRefName = (refName, match) => {
	// e.g. 'Stan Brakhage'
	return match ? match[4] : matchRefName(refName)[4];
};

export const getShortIdentifierFromRefName = (refName, match) => {
	// e.g. 'film_16mm' or 'TheDead1529309019213'
	return match ? match[3] : matchRefName(refName)[3];
};

export const getDisplayNameFromMatch = (match) => {
	// e.g. 'Stan Brakhage'
	return match[4];
};

export const getShortIdentifierFromMatch = (match) => {
	// e.g. 'film_16mm' or 'TheDead1529309019213'
	return match[3];
};

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
	if (color === 'color_b_w') return 'Color and B/W';
	return color;
}

export const getFilmSound = sound => {
	if (sound === 'silent') return 'Silent';
	if (sound === 'sound') return 'Sound';
}

export const yearsFromyear = year => {
	if (year.length !== 4) throw new Error('Invalid Year ' + year);
	return String(Math.floor(Number(year)/10) * 10) + 's';
}