import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getShortIdentifierFromRefName } from '../../utils/parse-data';

import CollectionItemPage from '../CollectionItemPage/CollectionItemPage';
import EphemeraMiniCard from '../EphemeraMiniCard/EphemeraMiniCard';
import EventTiles from '../EventTiles/EventTiles';
import SearchCards from '../SearchCards/SearchCards';
import ViewModeToggler from '../ViewModeToggler/ViewModeToggler';
import RentThis from '../RentThis/RentThis';
import Button from '../Button/Button';
import URNRelatedField from '../URNRelatedField/URNRelatedField';

const mapStateToProps = state => ({
	item: state.item.data,
	filmmaker: state.item.filmmaker && state.item.filmmaker.data,
	filmmakerOtherFilms: state.item.filmmaker &&
		state.item.filmmaker.otherFilms &&
		state.item.filmmaker.otherFilms.data
});

class CollectionFilmPage extends Component {
	render() {
		const { item, filmmaker, filmmakerOtherFilms, setViewMode, viewMode, singularItemForm, conditionallyShow } = this.props;
		console.log('Film Page item', item, 'FILMMAKER', filmmaker && filmmaker.termDisplayName);
		console.log('filmmakerFilms', filmmakerOtherFilms)
		return [
			conditionallyShow({
				id: 'about',
				order: 0,
				condition: !!item.workDescription,
				menuHeader: 'About the Film',
				renderContent: () => (
					<pre className="rich-text">
						{item.workDescription}
					</pre>
				)
			})
			,
			conditionallyShow({
				id: 'filmmaker',
				order: 1,
				condition: filmmaker && filmmaker.bioNote,
				menuHeader: 'About the Filmmaker',
				renderContent: () => (
					<pre className="rich-text">
						{filmmaker.bioNote}
					</pre>
				)
			})
			,
			conditionallyShow({
				id: 'filmmaker-profile',
				order: 2,
				condition: filmmaker,
				menuHeader: null,
				renderContent: () => (
					<Link className="section-button" to={`/collection/filmmakers/${getShortIdentifierFromRefName(filmmaker.refName)}`}>
						<Button className="default">
							View Filmmaker Profile
						</Button>
					</Link>
				),
				omitSectionWrapper: true
			})
			,
			conditionallyShow({
				id: 'others',
				order: 3,
				condition: filmmakerOtherFilms && filmmakerOtherFilms.length > 1,
				menuHeader: 'Other Films by this Filmmaker',
				renderHeader: () => <header className="d-flex">
					<h3 className="single-line-ellipsed">
						{'Other Films by ' + filmmaker.termDisplayName}
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
							itemType="film"
							viewMode={viewMode}
							customColSize={6}
							data={filmmakerOtherFilms} />
					</div>
				)
			})
			,
			conditionallyShow({
				id: 'ephemera',
				order: 4,
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
				order: 5,
				condition: item.events && item.events.length,
				menuHeader: 'Events',
				renderHeader: () => <h3>{'Events Featuring This ' + singularItemForm}</h3>,
				renderContent: () => (
					<EventTiles
						customColSize={6}
						data={item.events}
					/>
				)
			})
			,
			conditionallyShow({
				id: 'curated-programs',
				order: 6,
				condition: item.programs && item.programs.length,
				menuHeader: 'Programs',
				renderHeader: () => <h3>{'Curated Programs Featuring this ' + singularItemForm}</h3>,
				renderContent: () => (
					<SearchCards
						itemType="program"
						viewMode="grid"
						customColSize={6}
						data={item.programs}
					/>
				)
			})
			,
			conditionallyShow({
				id: 'rent',
				order: 7,
				condition: item.rentalPrice && item.rentalFormats,
				menuHeader: <Button className="default" size="small">Rent this Film</Button>,
				renderHeader: () => <h3>Rent this Film</h3>,
				renderContent: () => (
					<RentThis
						rentalPrice={item.rentalPrice}
						rentalPriceIsPublished={item.rentalPriceIsPublished || true}
						rentalFormats={item.rentalFormats &&
							((item.rentalFormats.rentalFormat && [item.rentalFormats.rentalFormat]) ||
								item.rentalFormats['list-item'])
						}
						rentalFormId={item.mtsId}
					/>
				)
			})
		];
	}
}

export default CollectionItemPage(connect(mapStateToProps)(CollectionFilmPage));
