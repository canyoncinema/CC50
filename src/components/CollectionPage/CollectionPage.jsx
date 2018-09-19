import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './CollectionPage.css';
import { updateQueryString } from '../../utils/query-string';
import CollectionContext, { toCollectionSearchLabel } from '../../collection-context';
import withScrollNav from '../withScrollNav/withScrollNav';
import { getSearchedItems } from '../../actions/searched-items-actions';

import MainNav from '../MainNav/MainNav';
import MainNavFilterBar from '../MainNavFilterBar/MainNavFilterBar';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import Search from '../Search/Search';
import ViewModeToggler from '../ViewModeToggler/ViewModeToggler';
import SearchResultsSummary from '../SearchResultsSummary/SearchResultsSummary';
import CollectionSearchResults from '../CollectionSearchResults/CollectionSearchResults';

const mapStateToProps = state => ({
	searchedItems: state.searchedItems.data,
	searchedItemsTotalCount: state.searchedItems.totalCount,
	searchedItemsSearchedText: state.searchedItems.searchedText,
	searchedItemsIsLoading: state.searchedItems.isLoading,
	searchedItemsError: state.searchedItems.error
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	getSearchedItems: (...args) =>
		dispatch(getSearchedItems(...args))
})

class CollectionPage extends Component {
	setSearchText = (e, searchTextVal, searchLabelVal, searchTextAutocompleted=false) => {
		// TODO: simplify
		const searchText = searchTextVal || e ? e.target.value : '';
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
		const path = '/collection' + (collectionItems ? '/' + collectionItems : '') + '?' + updateQueryString(location.search, {
			search: encodeURIComponent(text)
		});
		history.push(path);
		this.props.getSearchedItems(collectionItems, text);
	}

	componentDidMount() {
		if (this.props.searchedText) {
			this.props.getSearchedItems(this.props.collectionItems, this.props.searchedText);
		}
	}

	state = {
		searchText: this.props.searchedText || '',
		searchedItemsSearchedText: this.props.searchedItemsSearchedText || '',
		searchedText: this.props.searchedText || '',
		searchTextAutocompleted: false,
		setSearchText: this.setSearchText,
		submitSearch: this.submitSearch.bind(this),
		isCollapsedNav: false,
		viewMode: this.props.viewMode || 'grid',
		setViewMode: this.setViewMode,
		onOptionSelect: option => {
			if (this.props.searchedText) {
				this.submitSearch(this.props.searchedText, option.collectionItems);
			} else {
				// just push to history
				const path = '/collection' + (option.collectionItems ? '/' + option.collectionItems : '');
				this.props.history.push(path);				
			}
		}
	}

	render() {
		const {
			children,
			searchedItems,
			searchedItemsIsLoading,
			searchedItemsTotalCount,
			searchedItemsSearchedText,
			nonCollectionItemsString,
			collectionItems,
			isScrollNav
		} = this.props;
		const {
			searchedText,
			viewMode
		} = this.state;
		// TODO PAGINATE
		return (
			<CollectionContext.Provider value={this.state}>
				<div className={isScrollNav ? 'isScrollNav active' : 'isScrollNav'}>
					<MainNav isCollapsed={true} />
					<MainNavFilterBar collectionItems={collectionItems} />
				</div>
				<div className="CollectionPage">
					<header className="search-sort">
						<div className="container">
							<h1 className="white">Explore the collection</h1>
							<div className="filters">
								<Search id={0} collectionItems={collectionItems} />
								<ViewModeToggler
									activeMode={viewMode || 'grid'}
									onClick={this.setViewMode} />
							</div>
						</div>
					</header>
					{
						nonCollectionItemsString ?
						<SearchResultsSummary key={1}
              searchText={collectionItems ? collectionItems + nonCollectionItemsString : nonCollectionItemsString}
              numResults={0}
            />
            : searchedText && searchedItemsIsLoading ?
            <LoadingMessage />
						: searchedItemsSearchedText && !searchedItemsIsLoading ?
						<SearchResultsSummary key={1}
              searchText={searchedItemsSearchedText}
              numResults={searchedItemsTotalCount || 0}
            />
						: null
					}
					{
						searchedItemsSearchedText &&
						searchedItems &&
						!searchedItemsIsLoading ?
						<CollectionSearchResults
							viewMode={viewMode}
							items={searchedItems} />
						: !searchedItemsIsLoading ?
						children
						: null
					}
				</div>
			</CollectionContext.Provider>
		);
	}
}

export default withRouter(withScrollNav(connect(mapStateToProps, mapDispatchToProps)(CollectionPage)));
