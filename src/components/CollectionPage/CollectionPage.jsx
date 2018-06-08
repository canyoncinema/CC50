import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Row } from 'reactstrap';
import './CollectionPage.css';
import CollectionContext, { labelToSearchPlaceholder, toCollectionSearchLabel, toCollectionSearchPlaceholder } from '../../collection-context';

import MainNav from '../MainNav/MainNav';
import MainNavFilterBar from '../MainNavFilterBar/MainNavFilterBar';
import Search from '../Search/Search';
import ViewModeButtons from '../ViewModeButtons/ViewModeButtons';
import CollectionPageHome from '../CollectionPageHome/CollectionPageHome';
import CollectionPageItem from '../CollectionPageItem/CollectionPageItem';

class CollectionPage extends Component {
	constructor(props) {
		super(props);
		this.onViewModeChange = this.onViewModeChange.bind(this);
		this.setViewMode = this.setViewMode.bind(this);
	}

	setSearchText(e, searchTextVal, searchLabelVal, searchTextAutocompleted=false) {
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

	state = {
		searchLabel: toCollectionSearchLabel(this.props.match.params[0]),
		searchText: '',
		searchTextAutocompleted: false,
		setSearchText: this.setSearchText.bind(this),
		isCollapsedNav: false,
		viewMode: this.props.viewMode || 'grid',
		setViewMode: this.setViewMode.bind(this),
		onOptionSelect: searchLabel => {
			this.setState({
	  		searchLabel
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
		const { children } = this.props;
		const {
			isCollapsedNav
		} = this.state;
		console.log(this.props);
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
					{children}
				</div>
			</CollectionContext.Provider>
		);
	}
}

export default CollectionPage;
