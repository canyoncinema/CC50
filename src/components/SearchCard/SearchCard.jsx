import React, { Component } from 'react';
import { history } from '../../store';

import {
  withRouter
} from 'react-router-dom';
import './SearchCard.css';

import { itemTypeToCollectionSearchVal } from '../../collection-context';

import FilmmakerContent from './FilmmakerContent';
import FilmContent from './FilmContent';
import EphemeraContent from './EphemeraContent';
import ProgramContent from './ProgramContent';
import ClampedDescription from '../ClampedDescription/ClampedDescription';
import Tag from '../Tag/Tag';
import FilmmakerAvatar from '../FilmmakerAvatar/FilmmakerAvatar';
import Carousel, { MAX_CAROUSEL_IMAGES } from '../Carousel/Carousel';
import RelatedLinks from '../RelatedLinks/RelatedLinks';
import RelatedLink from '../RelatedLink/RelatedLink';

class SearchCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			data,
			id,
			itemType,
			photos,
			displayName,
			description,
			filmmaker,
			filmmakers,
			avatar,
			year,
			tags,
			related,
			viewMode,
			isItemPage
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
					isItemPage ? 'on-filmmaker-page': null,
					viewMode,
					].join(' ')}
				onClick={(e) => {
					e.stopPropagation();
					const path = `/collection/${itemTypeToCollectionSearchVal(itemType)}/${id}`;
					history.push(path);
				}}>
				<div className={listView ? isItemPage ? 'no-gutters single-line' : 'row no-gutters' : 'no-gutters'}>
				<div className={listView ? isItemPage ? 'filmmaker-film-still' :  'col-sm-2' : ''}>
					<div className="media">
						<Carousel
							photos={(photos || []).slice(0, MAX_CAROUSEL_IMAGES)}
							id={id}
							title={displayName}
							itemType={itemType} />
					</div>
				</div>
				<div className={listView ? isItemPage ? 'filmmaker-content' : 'col-sm-10' : ''}>
					<div className={listView && !isItemPage ? 'row no-gutters content' : 'no-gutters content'}>
						{
							itemType === 'filmmaker' ?
							<FilmmakerContent
								isItemPage={isItemPage}
								viewMode={viewMode}
								{...data}
							/> : null
						}
						{
							itemType === 'film' ?
							<FilmContent
								isItemPage={isItemPage}
								viewMode={viewMode}
								{...data}
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
