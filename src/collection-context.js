import React from 'react';

export const ALL_SEARCH_LABEL = 'All';
export const FILMS_SEARCH_LABEL = 'Films';
export const FILMMAKERS_SEARCH_LABEL = 'Filmmakers';
export const PROGRAMS_SEARCH_LABEL = 'Curated Programs';
export const EPHEMERA_SEARCH_LABEL = 'Ephemera';

export const ALL_SEARCH_PLACEHOLDER = 'Search films, filmmakers, curated programs, ephemera';
export const FILMS_SEARCH_PLACEHOLDER = 'Search films';
export const FILMMAKERS_SEARCH_PLACEHOLDER = 'Search filmmakers';
export const PROGRAMS_SEARCH_PLACEHOLDER = 'Search curated programs';
export const EPHEMERA_SEARCH_PLACEHOLDER = 'Search ephemera';


export const toCollectionSearchLabel = val => {
	if (val === 'all' || val === '/' || !val) {
		return ALL_SEARCH_LABEL;
	} else if (val.toLowerCase().indexOf('filmmaker') !== -1) {
		return FILMMAKERS_SEARCH_LABEL;
	} else if (val.toLowerCase().indexOf('film') !== -1) {
		return FILMS_SEARCH_LABEL;
	} else if (val.toLowerCase().indexOf('program') !== -1) {
		return PROGRAMS_SEARCH_LABEL;
	} else if (val.toLowerCase().indexOf('ephemera') !== -1) {
		return EPHEMERA_SEARCH_LABEL;
	} else {
		// SPEC: assume 'all' on nonsensical collection search path
		return ALL_SEARCH_LABEL;
	}
};

export const toCollectionSearchVal = label => {
	if (label === ALL_SEARCH_LABEL) return '';
	if (label === FILMMAKERS_SEARCH_LABEL) return 'filmmakers';
	if (label === FILMS_SEARCH_LABEL) return 'films';
	if (label === PROGRAMS_SEARCH_LABEL) return 'programs';
	if (label === EPHEMERA_SEARCH_LABEL) return 'ephemera';
}

export const toCollectionSort = val => {
	val = val.toLowerCase();
	if (val.indexOf('filmmaker') !== -1 ||
			val.indexOf('program') !== -1) {
		return {
			values: [
				'-created',
				'title'
			],
			labels: [
				'Recently Added',
				'Alphabetical'
			]
		};
	} else if (val.indexOf('film') !== -1) {
		return {
			values: [
				'-created',
				'title',
				'filmmaker',
				'-producedAt',
				'producedAt'
			],
			labels: [
				'Recently Added',
				'Alphabetical (Title)',
				'Alphabetical (Filmmaker)',
				'Production Date (New to Old)',
				'Production Date (Old to New)'
			]
		};
	} else if (val.indexOf('ephemera') !== -1) {
		return {
			values: [
				'-created',
				'random'
			],
			labels: [
				'Recently Added',
				'Random'
			]
		};
	} else {
		throw new Error('Invalid value ' + val);
	}
};

export const toCollectionSearchPlaceholder = val => {
	val = val.toLowerCase();
	if (val === 'all' || val === '/' || val === '') {
		return ALL_SEARCH_PLACEHOLDER;
	} else if (val.indexOf('filmmaker') !== -1) {
		return FILMMAKERS_SEARCH_PLACEHOLDER;
	} else if (val.indexOf('film') !== -1) {
		return FILMS_SEARCH_PLACEHOLDER;
	} else if (val.indexOf('program') !== -1) {
		return PROGRAMS_SEARCH_PLACEHOLDER;
	} else if (val.indexOf('ephemera') !== -1) {
		return EPHEMERA_SEARCH_PLACEHOLDER;
	} else {
		throw new Error('Invalid value ' + val);
	}
};

export const labelToSearchPlaceholder = {};

labelToSearchPlaceholder[ALL_SEARCH_LABEL] = ALL_SEARCH_PLACEHOLDER;
labelToSearchPlaceholder[FILMS_SEARCH_LABEL] = FILMS_SEARCH_PLACEHOLDER;
labelToSearchPlaceholder[FILMMAKERS_SEARCH_LABEL] = FILMMAKERS_SEARCH_PLACEHOLDER;
labelToSearchPlaceholder[PROGRAMS_SEARCH_LABEL] = PROGRAMS_SEARCH_PLACEHOLDER;
labelToSearchPlaceholder[EPHEMERA_SEARCH_LABEL] = EPHEMERA_SEARCH_PLACEHOLDER;


const CollectionContext = React.createContext({
	searchPlaceholder: 'Search films, filmmakers, curated programs, ephemera',
	searchLabel: 'All',
	searchText: '',
	isCollapsedNav: false,
	viewMode: 'grid',
	toSearchLabel: () => {},
	setViewMode: () => {},
	setSearchText: () => {},
	submitSearch: () => {},
	onOptionSelect: () => {}
});

export default CollectionContext;