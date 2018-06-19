import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withScrollNav from '../withScrollNav/withScrollNav';
import CollectionItemPage from '../CollectionItemPage/CollectionItemPage';
import EphemeraMiniCard from '../EphemeraMiniCard/EphemeraMiniCard';
import Filmmakers from '../Filmmakers/Filmmakers';
import EventTiles from '../EventTiles/EventTiles';
import NewsTiles from '../NewsTiles/NewsTiles';
import SearchCards from '../SearchCards/SearchCards';
import ViewModeToggler from '../ViewModeToggler/ViewModeToggler';
import RentThis from '../RentThis/RentThis';
import Button from '../Button/Button';
import { COLLECTION_ITEM_LIST_VIEW_MODE } from '../SearchCard/SearchCard';

class CollectionFilmmakerPage extends Component {
	render() {
		const { item, setViewMode, viewMode, singularItemForm, conditionallyShow } = this.props;
		return [
			conditionallyShow({
				id: 'about',
				condition: item.bioNote,
				menuHeader: 'About the Filmmaker',
				renderContent: () => (
					<pre className="rich-text">
						{item.bioNote}
					</pre>
				)
			})
			,
			conditionallyShow({
				id: null,
				condition: item.webAddress,
				menuHeader: null,
				renderContent: () => (
					<Link className="section-button" target="_blank" to={`${item.webAddress}`}>
						<Button className="default">
							Visit Artist's Website
						</Button>
					</Link>
				),
				omitSectionWrapper: true
			})
			,
			conditionallyShow({
				id: 'films',
				condition: item.films && item.films.length,
				menuHeader: 'Films by this Filmmaker',
				renderHeader: () => <header className="d-flex">
					<h3 className="single-line-ellipsed">
						Films by this Filmmaker
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
							viewMode={viewMode || 'list'}
							isItemPage={true}
							customColSize={(viewMode == 'list' || !viewMode) ? 12 : 6}
							data={item.films} />
					</div>
				)
			})
			,
			conditionallyShow({
				id: 'ephemera',
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
				id: 'curated-programs',
				condition: item.programs && item.programs.length,
				menuHeader: 'Curated Programs',
				renderHeader: () => <h3>{'Curated Programs Featuring this ' + singularItemForm}</h3>,
				renderContent: () => (
					<SearchCards
						viewMode="grid"
						customColSize={6}
						data={item.programs}
					/>
				)
			})
			,
			conditionallyShow({
				id: 'related-filmmakers',
				condition: item.relatedFilmmakers && item.relatedFilmmakers.length,
				menuHeader: 'Related Filmmakers',
				renderHeader: () => <h3>Related Filmmakers</h3>,
				renderContent: () => (
					<Filmmakers
						data={item.relatedFilmmakers}
					/>
				)
			})
			,
			conditionallyShow({
				id: 'events',
				condition: item.events && item.events.length,
				menuHeader: 'Events',
				renderHeader: () => <h3>{'Events Featuring this ' + singularItemForm}</h3>,
				renderContent: () => (
					<EventTiles
						customColSize={6}
						data={item.events}
					/>
				)
			})
			,
			conditionallyShow({
				id: 'news',
				condition: item.news && item.news.length,
				menuHeader: 'News',
				renderHeader: () => <h3>{'News Featuring this ' + singularItemForm}</h3>,
				renderContent: () => (
					<NewsTiles
						customColSize={6}
						data={item.news}
					/>
				)
			})
		];
	}
}

export default withScrollNav(CollectionItemPage(CollectionFilmmakerPage));
