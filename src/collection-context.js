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
	val = val.toLowerCase();
	if (val === 'all' || val === '/' || val === '') {
		return ALL_SEARCH_LABEL;
	} else if (val.indexOf('filmmaker') !== -1) {
		return FILMMAKERS_SEARCH_LABEL;
	} else if (val.indexOf('film') !== -1) {
		return FILMS_SEARCH_LABEL;
	} else if (val.indexOf('program') !== -1) {
		return PROGRAMS_SEARCH_LABEL;
	} else if (val.indexOf('ephemera') !== -1) {
		return EPHEMERA_SEARCH_LABEL;
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
	}
}

const CollectionContext = React.createContext({
	searchPlaceholder: 'Search films, filmmakers, curated programs, ephemera',
	searchLabel: 'All',
	searchText: '',
	isCollapsedNav: false,
	viewMode: 'grid',
	toSearchLabel: () => {},
	setViewMode: () => {},
	onOptionSelect: () => {}
});

export default CollectionContext;