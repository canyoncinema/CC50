import React, { Component } from 'react';

import withScrollNav from '../withScrollNav/withScrollNav';
import CollectionItemPage from '../CollectionItemPage/CollectionItemPage';
import EphemeraMiniCard from '../EphemeraMiniCard/EphemeraMiniCard';
import EventTiles from '../EventTiles/EventTiles';
import SearchCards from '../SearchCards/SearchCards';
import ViewModeToggler from '../ViewModeToggler/ViewModeToggler';
import RentThis from '../RentThis/RentThis';
import Button from '../Button/Button';


class CollectionFilmPage extends Component {
	render() {
		const { item, setViewMode, viewMode, singularItemForm, conditionallyShow } = this.props;
		return [
			conditionallyShow({
				id: 'about',
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
				id: 'about-filmmaker',
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
				id: 'others',
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

export default withScrollNav(CollectionItemPage(CollectionFilmPage));
