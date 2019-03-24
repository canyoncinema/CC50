import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import CollectionItemPage from '../CollectionItemPage/CollectionItemPage';
import EphemeraMiniCard from '../EphemeraMiniCard/EphemeraMiniCard';
import Filmmakers from '../Filmmakers/Filmmakers';
import EventTiles from '../EventTiles/EventTiles';
import NewsTiles from '../NewsTiles/NewsTiles';
import SearchCards from '../SearchCards/SearchCards';
import RichText from '../RichText/RichText';
import ViewModeToggler from '../ViewModeToggler/ViewModeToggler';
import Button from '../Button/Button';
import ReactMarkdown from 'react-markdown';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import { toExternalWebUrl, toItemsData } from '../../utils/parse-data';

const mapStateToProps = state => ({
	itemFilms: state.item.films.data,
	isLoading: state.item.isLoading
});

class CollectionFilmmakerPage extends Component {
	render() {
		const { item, isLoading, shortIdentifier, itemFilms, setViewMode, viewMode, singularItemForm, conditionallyShow } = this.props;
		if (isLoading) {
			return <LoadingMessage />;
		}
		return [
			conditionallyShow({
				id: 'about',
				order: 0,
				condition: item.bioNote,
				menuHeader: 'About the Filmmaker',
				renderContent: () => (
					<RichText>
						<ReactMarkdown source={item.bioNote} />
					</RichText>
				)
			})
			,
			conditionallyShow({
				id: null,
				order: 1,
				condition: item.webAddress,
				menuHeader: null,
				renderContent: () => (
					<a className="section-button"
						target="_blank"
						href={`${toExternalWebUrl(item.webAddress)}`}>
						<Button className="default">
							Visit Artist's Website
						</Button>
					</a>
				),
				omitSectionWrapper: true
			})
			,
			conditionallyShow({
				id: 'films',
				order: 2,
				condition: itemFilms && itemFilms.length,
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
							itemType="film"
							viewMode={viewMode || 'list'}
							onFilmmakerPage={true}
							customColSize={(viewMode === 'list' || !viewMode) ? 12 : 6}
							data={itemFilms} />
					</div>
				)
			})
			,
			// conditionallyShow({
			// 	id: 'ephemera',
			// 	order: 3,
			// 	condition: shortIdentifier.indexOf('AbigailChild') !== -1,
			// 	menuHeader: 'Ephemera',
			// 	renderHeader: () => <h3>{'Ephemera Related to This ' + singularItemForm}</h3>,
			// 	renderContent: () => (
			// 		<Row>
			// 		{ toItemsData(ephemeraData).map((e, i) =>
			// 			<Col xs={4} key={i}>
			// 				<EphemeraMiniCard
			// 					key={i}
			// 					title={e.termDisplayName}
			// 					shortIdentifier={'AbigailChildEphemera' + i}
			// 					item={e}
			// 				/>
			// 			</Col>
			// 		) }
			// 		</Row>
			// 	)
			// })
			// ,
			conditionallyShow({
				id: 'curated-programs',
				order: 4,
				condition: item.programs && item.programs.length,
				menuHeader: 'Curated Programs',
				renderHeader: () => <h3>{'Curated Programs Featuring this ' + singularItemForm}</h3>,
				renderContent: () => (
					<SearchCards
						onFilmmakerPage={true}
						itemType="program"
						viewMode="grid"
						customColSize={6}
						data={item.programs}
					/>
				)
			})
			,
			conditionallyShow({
				id: 'related-filmmakers',
				order: 5,
				condition: item.relatedPersons && item.relatedPersons.length,
				menuHeader: 'Related Filmmakers',
				renderHeader: () => <h3>Related Filmmakers</h3>,
				renderContent: () => (
					<Filmmakers
						data={item.relatedPersons}
					/>
				)
			})
			,
			conditionallyShow({
				id: 'events',
				order: 6,
				condition: item.exhibitions && item.exhibitions.length,
				menuHeader: 'Events',
				renderHeader: () => <h3>{'Events Featuring this ' + singularItemForm}</h3>,
				renderContent: () => (
					<EventTiles
						customColSize={6}
						data={item.exhibitions}
					/>
				)
			})
			,
			conditionallyShow({
				id: 'news',
				order: 7,
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

export default CollectionItemPage(connect(mapStateToProps)(CollectionFilmmakerPage));
