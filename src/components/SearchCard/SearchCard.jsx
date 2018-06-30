import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { CSpaceCanvasSize } from '../CSpacePhotoFill/CSpacePhotoFill';
import { blobCsidToSrc } from '../../utils/parse-data';

const getPhotoSrcs = mediaObjs =>
	(mediaObjs || []).map(m => blobCsidToSrc(m.blobCsid, '360x270'));

const mapStateToProps = (state, ownProps) => ({
	media: state.itemsMedia.dataByCsid &&
	state.itemsMedia.dataByCsid.get(ownProps.csid)
});

class SearchCard extends Component {
	render() {
		const {
			data,
			csid,
			media,
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
				<div className={listView ?
						(onFilmmakerPage || isItemPageFilmCard) ? 'no-gutters single-line' : 'd-flex'
						: 'no-gutters'}>
				<div className={listView && (onFilmmakerPage || isItemPageFilmCard) ?
						'filmmaker-film-still' :  ''}>
					<div className="media">
						<Carousel
							fromCSpace={true}
							blobCsids={(media || []).map(m => m.blobCsid).slice(0, MAX_CAROUSEL_IMAGES)}
							canvasSize={listView ? CSpaceCanvasSize.list : CSpaceCanvasSize.grid}
							id={csid}
							itemType={itemType} />
					</div>
				</div>
				<div className={listView && (onFilmmakerPage || isItemPageFilmCard) ? 'filmmaker-content' : ''}>
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

export default withRouter(connect(mapStateToProps)(SearchCard));
