import React, { Component } from 'react';

import {
  withRouter
} from 'react-router-dom';
import './SearchCard.css';

import { itemTypeToCollectionSearchVal } from '../../collection-context';

import FilmmakerContent from './FilmmakerContent';
import FilmContent from './FilmContent';
import EphemeraContent from './EphemeraContent';
import ProgramContent from './ProgramContent';
import Carousel, { MAX_CAROUSEL_IMAGES } from '../Carousel/Carousel';

class SearchCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			data,
			csid,
			shortIdentifier,
			itemType, // film, program, ephemera, or filmmaker
			photos,
			viewMode,
			onFilmmakerPage,
			isItemPageFilmCard,
			history
		} = this.props;
		// Note: certain design rules exist for cards on filmmaker pages.
		// See Cards design spec.
		const itemTypeClassName = itemType.toLowerCase().replace(' ', '-');
		const listView = viewMode === 'list';
		return (
			<div
				className={[
					'SearchCard',
					'shadow-on-hover',
					itemTypeClassName,
					onFilmmakerPage ||  isItemPageFilmCard ? 'is-item-page-film-card': null,
					viewMode,
					].join(' ')}
				onClick={(e) => {
					e.stopPropagation();
					const path = `/collection/${itemTypeToCollectionSearchVal(itemType)}/${shortIdentifier}`;
					history.push(path);
				}}>
				<div className={listView ? (onFilmmakerPage || isItemPageFilmCard) ? 'no-gutters single-line' : 'row no-gutters' : 'no-gutters'}>
				<div className={listView ? (onFilmmakerPage || isItemPageFilmCard) ? 'filmmaker-film-still' :  'col-2' : ''}>
					<div className="media">
						<Carousel
							photos={(photos || []).slice(0, MAX_CAROUSEL_IMAGES)}
							id={csid}
							itemType={itemType} />
					</div>
				</div>
				<div className={listView ? (onFilmmakerPage || isItemPageFilmCard) ? 'filmmaker-content' : 'col-10' : ''}>
					<div className="content">
						{
							itemType === 'filmmaker' ?
							<FilmmakerContent
								onFilmmakerPage={onFilmmakerPage || isItemPageFilmCard}
								viewMode={viewMode}
								item={data}
							/> : null
						}
						{
							itemType === 'film' ?
							<FilmContent
								isItemPageFilmCard={isItemPageFilmCard || onFilmmakerPage}
								viewMode={viewMode}
								item={data}
							/> : null
						}
						{
							itemType === 'ephemera' ?
							<EphemeraContent
								viewMode={viewMode}
								{...data}
							/> : null
						}
						{
							itemType === 'program' ?
							<ProgramContent
								viewMode={viewMode}
								{...data}
							/> : null
						}
					</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(SearchCard);
