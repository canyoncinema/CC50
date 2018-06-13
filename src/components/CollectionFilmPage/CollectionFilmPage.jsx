import React, { Component } from 'react';

import withScrollNav from '../withScrollNav/withScrollNav';
import CollectionItemPage from '../CollectionItemPage/CollectionItemPage';
import EphemeraMiniCard from '../EphemeraMiniCard/EphemeraMiniCard';
import EventTile from '../EventTile/EventTile';
import SearchCards from '../SearchCards/SearchCards';
import ViewModeToggler from '../ViewModeToggler/ViewModeToggler';


class CollectionFilmPage extends Component {
	shouldComponentUpdate(nextProps) {
		if (nextProps.headersInitialized && nextProps.item.id === this.props.item.id) {
				return false;
		};
		return true;
	}

	render() {
		const { headersInitialized, item, setViewMode, viewMode, singularItemForm, conditionallyShow } = this.props;
		return [
			conditionallyShow({
				headersInitialized,
				condition: !!item.description,
				menuHeader: 'About the Film',
				renderContent: () => (
					<pre className="rich-text">
						{item.description}
					</pre>
				)
			})
			,
			conditionallyShow({
				headersInitialized,
				condition: item.filmmaker && !!item.filmmaker.description,
				menuHeader: 'About the Filmmaker',
				renderContent: () => (
					<pre className="rich-text">
						{item.filmmaker.description}
					</pre>
				)
			})
			,
			conditionallyShow({
				headersInitialized,
				condition: item.filmmaker && item.filmmaker.films && item.filmmaker.films.length > 1,
				menuHeader: 'Other Films by this Filmmaker',
				renderHeader: () => <header className="d-flex">
					<h3 className="single-line-ellipsed">
						{'Other Films by ' + item.filmmaker.title}
					</h3>
					<span className="ml-auto">
						<ViewModeToggler
							activeMode={viewMode || 'list'}
							onClick={setViewMode}
							theme="dark" />
					</span>
				</header>,
				renderContent: () => (
					<div className="container no-padding">
						<SearchCards
							viewMode={viewMode}
							customColSize={6}
							data={item.filmmaker.films.filter(f => f.id !== item.id)} />
					</div>
				)
			})
			,
			conditionallyShow({
				headersInitialized,
				condition: item.ephemera && item.ephemera.length,
				menuHeader: 'Ephemera',
				renderHeader: () => <h3>{'Ephemera Related to This ' + singularItemForm}</h3>,
				renderContent: () => (
					item.ephemera.map((e, i) =>
						<EphemeraMiniCard
							key={i}
							{...e}
						/>
					)
				)
			})
			,
			conditionallyShow({
				headersInitialized,
				condition: item.events && item.events.length,
				menuHeader: 'Events',
				renderHeader: () => <h3>{'Events Featuring This ' + singularItemForm}</h3>,
				renderContent: () => (
					item.events.map((e, i) =>
						<EventTile
							key={i}
							{...e}
						/>
					)
				)
			})
			,
			conditionallyShow({
				headersInitialized,
				condition: item.programs && item.programs.length,
				menuHeader: 'Programs',
				renderHeader: () => <h3>{'Curated Programs Featuring this ' + singularItemForm}</h3>,
				renderContent: () => (
					item.programs.map((program, i) =>
						<SearchCards
							key={i}
							viewMode="grid"
							customColSize={6}
							data={program}
						/>
					)
				)
			})
		];
	}
}

export default withScrollNav(CollectionItemPage(CollectionFilmPage));
