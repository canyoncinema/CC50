import React from 'react';

export const ALL_SEARCH_LABEL = 'All';
export const FILMS_SEARCH_LABEL = 'Films';
export const FILMMAKERS_SEARCH_LABEL = 'Filmmakers';
export const PROGRAMS_SEARCH_LABEL = 'Curated Programs';
export const EPHEMERA_SEARCH_LABEL = 'Ephemera';

const CollectionContext = React.createContext({
	searchPlaceholder: 'Search films, filmmakers, curated programs, ephemera',
	searchLabel: 'All',
	searchText: '',
	isCollapsedNav: false,
	viewMode: 'grid',
	setViewMode: () => {},
	onOptionSelect: () => {}
});

export default CollectionContext;