import React, { Component } from 'react';
import withScrollNav from '../withScrollNav/withScrollNav';
import CollectionItemPage from '../CollectionItemPage/CollectionItemPage';
import LoadingMessage from "../LoadingMessage/LoadingMessage";
import ReactMarkdown from "react-markdown";
import EphemeraMiniCard from '../EphemeraMiniCard/EphemeraMiniCard';
import Filmmakers from '../Filmmakers/Filmmakers';
import EventTiles from '../EventTiles/EventTiles';
import NewsTiles from '../NewsTiles/NewsTiles';
import SearchCards from '../SearchCards/SearchCards';
import ViewModeToggler from '../ViewModeToggler/ViewModeToggler';
import Button from '../Button/Button';
import RentThis from '../RentThis/RentThis';
import {addEventFields, addProgramFields, parseItemExhibitionWorks, toItemData, getShortIdentifierFromRefName} from '../../utils/parse-data';
// import connect from "react-redux/es/connect/connect";
// import {getEvents} from "../../actions/events-actions";
// import { getProgramDetail } from "../../actions/program-detail-actions";
import { connect } from 'react-redux';
import {getEventDetailFilms} from "../../actions/event-detail-films-actions";
import {getItemsMedia} from "../../actions/items-media-actions";
import {RECEIVED_EVENT_DETAIL} from "../../actionTypes";

const mapDispatchToProps = dispatch => ({
    // getProgramDetail: (...args) => dispatch(getProgramDetail(...args))
    getEventDetailFilms: (...args) => dispatch(getEventDetailFilms(...args))
});


const mapStateToProps = state => ({
    item: state.item.data,
	// films: state.item.films.map(m => getShortIdentifierFromRefName(m))
    // events: state.events.data,
    // isLoading: state.item.isLoading,
    // filmmaker: state.item.filmmaker && state.item.filmmaker.data,
    // filmmakerOtherFilms: state.item.filmmaker &&
    //     state.item.filmmaker.otherFilms &&
    //     state.item.filmmaker.otherFilms.data
});

class CollectionProgramPage extends Component {
    componentDidMount() {
    	// this.props.getEventDetailFilms(this.props.item);
        // const item = addProgramFields(this.props.item);
        // if (item.films) {
        // this.props.getEventDetailFilms(item.films);
        // }
    }

	render() {
        const { isLoading, item, setViewMode, viewMode, singularItemForm, conditionallyShow } = this.props;
        if (isLoading) {
            return <LoadingMessage />;
        }
        console.log('item', item)
        return [
			conditionallyShow({
				id: 'about',
				condition: item.scopeNote,
                order: 0,
                menuHeader: 'About the Program',
				renderContent: () => (
					<pre className="rich-text">
						{item.scopeNote}
					</pre>
				)
			})
			,
			conditionallyShow({
				id: 'films',
				condition: item.films && item.films.length,
				menuHeader: 'Films',
                order: 1,
                renderHeader: () => <header className="d-flex">
					<h3 className="single-line-ellipsed">
						Films in this Program
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
							customColSize={(viewMode === 'list' || !viewMode) ? 12 : 6}
							data={item.films} />
					</div>
				)
			})
			,
			conditionallyShow({
				id: 'filmmakers',
				condition: item.filmmakers && item.filmmakers.length,
				menuHeader: 'Filmmakers',
				renderHeader: () => <h3>Filmmakers in this Program</h3>,
				renderContent: () => <Filmmakers data={item.filmmakers} />
			})
			,
			conditionallyShow({
				id: 'ephemera',
				condition: item.ephemera && item.ephemera.length,
				menuHeader: 'Ephemera',
				renderHeader: () => <h3>Ephemera Related to this Program</h3>,
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
				renderHeader: () => <h3>Events Featuring this Program</h3>,
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
			,
			conditionallyShow({
				id: 'rent',
				condition: item.rentalFormats && item.rentalFormats.length,
				menuHeader: <Button className="default" size="small">Rent this Program</Button>,
				renderHeader: () => <h3>Rent this Program</h3>,
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

export default CollectionItemPage(connect(mapStateToProps, mapDispatchToProps)(CollectionProgramPage));