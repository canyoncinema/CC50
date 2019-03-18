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
import CoverCarousel, { MAX_CAROUSEL_IMAGES } from '../Carousel/CoverCarousel';
import { CSpaceCanvasSize } from '../CSpacePhoto/CSpacePhoto';
import { getItemsMedia } from '../../actions/items-media-actions';
import {
	blobCsidToSrc,
	getShortIdentifierFromRefName,
	getDisplayNameFromRefName,
	fullSizedCarouselCaption,
	fullSizedCarouselCaptionLink
} from '../../utils/parse-data';
//
// const getPhotoSrcs = mediaObjs =>
// 	(mediaObjs || []).map(m => blobCsidToSrc(m.blobCsid, '360x270'));

const mappedMediaShortIdentifier = (props) =>
	getShortIdentifierFromRefName(props.data.refName, null, props.data.refName);

const mapStateToProps = (state, ownProps) => ({
	media: state.itemsMedia.dataByShortIdentifier &&
		state.itemsMedia.dataByShortIdentifier.get(
			mappedMediaShortIdentifier(ownProps)
	),
	mediaByRtSbj: state.itemsMedia.dataByRtSbj &&
		state.itemsMedia.dataByRtSbj.get(
			ownProps.csid
		)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	getItemsMedia: 	(...args) => dispatch(getItemsMedia(...args))
});

class SearchCard extends Component {
	componentDidMount() {
		// get media for this card
		const { data, csid, itemType, mediaIsByRtSbj } = this.props;
		if (!itemType) throw new Error('Requires itemType');
		const msid = mappedMediaShortIdentifier(this.props);
        this.props.getItemsMedia({
			item: data,
			itemType: itemType,
            mappedShortIdentifier: msid,
			csid: csid,
            mediaIsByRtSbj: mediaIsByRtSbj
        });
	}
	render() {
		const {
			data,
			csid,
			media,
			mediaIsByRtSbj,
            mediaByRtSbj,
			shortIdentifier,
			itemType, // film, program, ephemera, or filmmaker
			photos,
			hideTags,
			viewMode,
			onFilmmakerPage, // TODO fix use of isItemPageFilmCard || onFilmmakerPage
			isItemPageFilmCard,
			showFilmFilmmaker,
			history
		} = this.props;
		// Note: certain design rules exist for cards on filmmaker pages.
		// See Cards design spec.
		const itemTypeClassName = itemType.toLowerCase().replace(' ', '-');
		const listView = viewMode === 'list';
		const thisMedia = mediaIsByRtSbj ? mediaByRtSbj : media;
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
					/* the types of calls using shortId work for all collection item types OTHER than programs
					 which work more like events, passing a csid not a (partially) human-readable id. But
					 within the structure of this app programs are looped in with other collection items not Events.
					 So they are missing a shortId but have a csid.
					 TODO: share code between Events and Programs and don't make Programs an exception case from all other collection item types.
					 in this temp setup the csid for Programs is getting passed and then labeled incorrectly as shortId from the url params.
					 */
					const id = shortIdentifier ? shortIdentifier : csid;
					const path = `/collection/${itemTypeToCollectionSearchVal(itemType)}/${id}`;
					history.push(path);
				}}>
				<div className={listView ?
						(onFilmmakerPage || isItemPageFilmCard) ? 'no-gutters single-line' : 'd-flex'
						: 'no-gutters'}>
				<div className={listView && (onFilmmakerPage || isItemPageFilmCard) ?
						'filmmaker-film-still' :  ''}>
					<div className="media">
						<CoverCarousel
							fromCSpace={true}
							captions={itemType !== 'filmmaker' ?
								null :
								(thisMedia || []).map(m => fullSizedCarouselCaption(m))
							}
							captionLinks={itemType !== 'filmmaker' ?
								null :
								(thisMedia || []).map(m => fullSizedCarouselCaptionLink(m))
							}
							blobCsids={(thisMedia || []).map(m => m.blobCsid).slice(0, MAX_CAROUSEL_IMAGES)}
							canvasSize={
								listView ?
									(isItemPageFilmCard || onFilmmakerPage) ?
										CSpaceCanvasSize.large
									: CSpaceCanvasSize.list
								: CSpaceCanvasSize.grid
							}
							id={csid}
							title={data.termDisplayName}
							itemType={itemType} />
					</div>
				</div>
				<div className={listView && (onFilmmakerPage || isItemPageFilmCard) ? 'filmmaker-content' : 'container-fluid'}>
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
								showFilmFilmmaker={showFilmFilmmaker}
								hideTags={hideTags}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchCard));
