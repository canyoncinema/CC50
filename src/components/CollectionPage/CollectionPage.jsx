import React, { Component } from 'react';
import './CollectionPage.css';

import Search from '../Search/Search';
import ViewModeButtons from '../ViewModeButtons/ViewModeButtons';

class CollectionPage extends Component {
	state = {
		searchPlaceholder: 'Search films, filmmakers, curated programs, ephemera'
	}
	render() {
		return (
			<div className="CollectionPage">
				<header>
					<h1 className="white">Explore the collection</h1>
					<div className="filters">
						<Search />
						<div className="change-view">
							<label>View:</label><ViewModeButtons />
						</div>
					</div>
				</header>
			</div>
		);
	}
}

export default CollectionPage;
