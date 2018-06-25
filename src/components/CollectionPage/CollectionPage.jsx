import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './CollectionPage.css';
import { updateQueryString } from '../../utils/query-string';
import CollectionContext, { toCollectionSearchLabel } from '../../collection-context';
import withScrollNav from '../withScrollNav/withScrollNav';

import MainNav from '../MainNav/MainNav';
import MainNavFilterBar from '../MainNavFilterBar/MainNavFilterBar';
import Search from '../Search/Search';
import ViewModeToggler from '../ViewModeToggler/ViewModeToggler';
import SearchResultsSummary from '../SearchResultsSummary/SearchResultsSummary';

class CollectionPage extends Component {
	setSearchText = (e, searchTextVal, searchLabelVal, searchTextAutocompleted=false) => {
		// TODO: simplify
		const searchText = searchTextVal || e.target.value;
		this.setState({
			searchText,
			searchTextAutocompleted
		});
	}

	setViewMode = (mode) => {
		this.setState({
			viewMode: mode
		});
	}

	submitSearch = (text, collectionItems) => {
		const { location, history } = this.props;
		const path = location.pathname + '?' + updateQueryString(location.search, {
			search: encodeURIComponent(text),
			items: collectionItems
		});
		history.push(path);
	}

	state = {
		searchText: this.props.searchedText || '',
		searchedText: this.props.searchedText || '',
		searchTextAutocompleted: false,
		setSearchText: this.setSearchText,
		submitSearch: this.submitSearch.bind(this),
		isCollapsedNav: false,
		viewMode: this.props.viewMode || 'grid',
		setViewMode: this.setViewMode,
		onOptionSelect: searchLabel => {
			// SPEC: changing search menu filter, changes page & resets searched text
			this.setState({
	  		searchedText: ''
			});
		}
	}
  

	render() {
		const {
			children,
			nonCollectionItemsString,
			collectionItems,
			isScrollNav
		} = this.props;
		const {
			searchedText,
			viewMode
		} = this.state;

		return (
			<CollectionContext.Provider value={this.state}>
				<div className={isScrollNav ? 'isScrollNav active' : 'isScrollNav'}>
					<MainNav isCollapsed={true} />
					<MainNavFilterBar collectionItems={collectionItems} />
				</div>
				<div className="CollectionPage">
					<header className="search-sort">
						<h1 className="white">Explore the collection</h1>
						<div className="filters">
							<Search id={0} collectionItems={collectionItems} />
							<ViewModeToggler
								activeMode={viewMode || 'grid'}
								onClick={this.setViewMode} />
						</div>
					</header>
					{
						nonCollectionItemsString ?
						<SearchResultsSummary key={1}
              searchText={collectionItems ? collectionItems + nonCollectionItemsString : nonCollectionItemsString}
              numResults={0}
            />
						: searchedText ?
						<SearchResultsSummary key={1}
              searchText={searchedText}
              numResults={10}
            />
						: null
					}
					{children}
				</div>
			</CollectionContext.Provider>
		);
	}
}

export default withRouter(withScrollNav(CollectionPage));
