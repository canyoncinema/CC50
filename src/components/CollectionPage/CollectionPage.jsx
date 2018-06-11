import React, { Component } from 'react';
import './CollectionPage.css';
import CollectionContext, { toCollectionSearchLabel } from '../../collection-context';

import MainNav from '../MainNav/MainNav';
import MainNavFilterBar from '../MainNavFilterBar/MainNavFilterBar';
import Search from '../Search/Search';
import ViewModeButtons from '../ViewModeButtons/ViewModeButtons';
import SearchResultsSummary from '../SearchResultsSummary/SearchResultsSummary';

class CollectionPage extends Component {
	constructor(props) {
		super(props);
		this.onViewModeChange = this.onViewModeChange.bind(this);
		this.setViewMode = this.setViewMode.bind(this);
	}

	setSearchText = (e, searchTextVal, searchLabelVal, searchTextAutocompleted=false) => {
		// TODO: simplify
		const searchText = searchTextVal || e.target.value;
		this.setState({
			searchText,
			searchLabel: searchLabelVal ?
				toCollectionSearchLabel(searchLabelVal)
				: this.state.searchLabel,
			searchTextAutocompleted
		});
	}

	setViewMode(mode) {
		this.setState({
			viewMode: mode
		});
	}

	submitSearch = (text, label) => {
		this.setState({
			searchText: text,
			searchedText: text,
			searchLabel: label,
			searchTextAutocompleted: true
		});
	}

	state = {
		searchLabel: toCollectionSearchLabel(this.props.collectionItemsString),
		searchText: this.props.searchedText,
		searchedText: this.props.searchedText,
		searchTextAutocompleted: false,
		setSearchText: this.setSearchText,
		submitSearch: this.submitSearch,
		isCollapsedNav: false,
		viewMode: this.props.viewMode || 'grid',
		setViewMode: this.setViewMode.bind(this),
		onOptionSelect: searchLabel => {
			// SPEC: changing search menu filter, changes page & resets searched text
			this.setState({
	  		searchLabel,
	  		searchedText: ''
			});
		}
	}

	componentDidMount() {
		const headerHeight = 361;
    window.addEventListener('scroll', (e) => {
      if (window.scrollY >= headerHeight &&
      		!this.state.isCollapsedNav) {
      	this.setState({
      		isCollapsedNav: true
      	});
      } else if (window.scrollY < headerHeight &&
      		this.state.isCollapsedNav) {
      	this.setState({
      		isCollapsedNav: false
      	});
      }
    });
  }

	onViewModeChange(mode) {
		this.setState({
			viewMode: mode
		});
	}

	render() {
		const { children, nonCollectionItemsString, collectionItemsString } = this.props;
		const {
			isCollapsedNav,
			searchedText
		} = this.state;
		console.log(this.props, 's', this.state);

		return (
			<CollectionContext.Provider value={this.state}>
				<div className={isCollapsedNav ? 'collapsed-nav active' : 'collapsed-nav'}>
					<MainNav isCollapsed={true} />
					<MainNavFilterBar />
				</div>
				<div className="CollectionPage">
					<header className="search-sort">
						<h1 className="white">Explore the collection</h1>
						<div className="filters">
							<Search id={0} />
							<div className="change-view">
								<label>View:</label>
									<ViewModeButtons />
							</div>
						</div>
					</header>
					{
						nonCollectionItemsString ?
						<SearchResultsSummary key={1}
              searchText={collectionItemsString ? collectionItemsString + nonCollectionItemsString : nonCollectionItemsString}
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

export default CollectionPage;
