import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withScrollNav from '../withScrollNav/withScrollNav';
import CollectionItemPage from '../CollectionItemPage/CollectionItemPage';
import EphemeraMiniCard from '../EphemeraMiniCard/EphemeraMiniCard';
import EventTiles from '../EventTiles/EventTiles';
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
				condition: item.description,
				menuHeader: 'About the Filmmaker',
				renderContent: () => (
					<pre className="rich-text">
						{item.description}
					</pre>
				)
			})
			,
			conditionallyShow({
				id: null,
				condition: item.webAddress,
				menuHeader: null,
				renderContent: () => (
					<Link target="_blank" to={`${item.webAddress}`}>
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
							isFilmmakerPage={true}
							customColSize={6}
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
				id: 'events',
				condition: item.events && item.events.length,
				menuHeader: 'Events',
				renderHeader: () => <h3>{'Events Featuring This ' + singularItemForm}</h3>,
				renderContent: () => (
					<EventTiles
						data={item.events}
					/>
				)
			})
			,
			conditionallyShow({
				id: 'curated-programs',
				condition: item.programs && item.programs.length,
				menuHeader: 'Programs',
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
				id: 'rent',
				condition: item.rentalFormats && item.rentalFormats.length,
				menuHeader: <Button className="default" size="small">Rent this Film</Button>,
				renderContent: () => (
					<RentThis
						rentalPrice={item.rentalPrice}
						rentalPriceIsPublished={item.rentalPriceIsPublished}
						rentalFormats={item.rentalFormats}
						rentalFormId={item.rentalFormId}
					/>
				)
			})
		];
	}
}

export default withScrollNav(CollectionItemPage(CollectionFilmmakerPage));
