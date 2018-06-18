import React, { Component } from 'react';
import { history } from '../../store';

import {
  withRouter
} from 'react-router-dom';
import './SearchCard.css';

import { itemTypeToCollectionSearchVal } from '../../collection-context';
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
		let maxDisplayNameLines, maxDescriptionLines;
		if (isItemPage) {
			maxDescriptionLines = listView ? 2 : 3;
			maxDisplayNameLines = listView ? 1 : 2;
		} else {
			if (itemType === 'filmmaker') {
				maxDisplayNameLines = 1;
				maxDescriptionLines = listView ? 3 : 6;
			} else if (itemType === 'ephemera') {
				maxDisplayNameLines = listView ? 2 : 3;
				maxDescriptionLines = 3;
			} else {
				maxDisplayNameLines = listView && itemType === 'film' ? 1 : 2;
				maxDescriptionLines = 3;
			}
		}
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
						<div className={listView && !isItemPage ? 'col-sm-4 main' : 'main'}>
							<div className={itemType === 'filmmaker' ? 'd-flex' : null}>
								{
									itemType === 'filmmaker' ?
									<div className="avatar">
										<FilmmakerAvatar url={avatar} />
									</div>
									: null
								}
								<div>
									{	!isItemPage ?
										<h6>{itemType}</h6>
										: null
									}
									<h4 className="d-flex">
										<ClampedDescription
											className="displayName"
											maxLines={maxDisplayNameLines}
											title={displayName + (year ? ` (${year})` : '')}>
											{
												listView && !isItemPage ?
												displayName + (year ? ` (${year})` : '') :
												displayName
											}
										</ClampedDescription>
										{
											listView && !isItemPage ? null :
											<span className="year ml-auto">{year}</span>
										}
									</h4>
								</div>
							</div>
							{
								filmmaker && !isItemPage ?
								<div className="creator" title={filmmaker.displayName}>
									<a className="gold" onClick={(e) => {
										e.stopPropagation();
										const path = `/collection/filmmakers/${filmmaker.id}`;
										history.push(path);
									}}>
										{filmmaker.displayName}
									</a>
								</div>
								: null
							}
						</div>
						{
							itemType === 'ephemera' ?
							null :
							<div className={listView && !isItemPage ?
								itemType === 'filmmaker' ||
								(itemType === 'film' && (!tags || !tags.length)) ||
								(itemType === 'program' && (!filmmakers || !filmmakers.length))
								?
									'col-sm-8' : 'col-sm-4'
								: null}>
								<div className={listView && !isItemPage ? 'list-center-wrapper' : null}>
									<ClampedDescription
										className="description"
										maxLines={maxDescriptionLines}>
										{description}
									</ClampedDescription>
								</div>
							</div>
						}
							{
								filmmakers && filmmakers.length ?
								<div className={listView ? 'col-sm-4 filmmakers' : 'filmmakers'}>
									<div className="no-gutters">
										<ClampedDescription
											className="no-gutters"
											maxLines={listView ? 3 : 2}
											title={displayName + (year ? ` (${year})` : '')}>
											<RelatedLinks
												label="Filmmakers">
												{filmmakers.map((filmmaker, i) =>
													<RelatedLink
														key={i}
														isLast={i === filmmakers.length - 1}
														to={`/filmmaker/${filmmaker.id}`}>
														<span title={filmmaker.displayName}>{filmmaker.displayName}</span>
													</RelatedLink>
												)}
											</RelatedLinks>
										</ClampedDescription>
									</div>
								</div>
								: null
							}
						{
							tags && tags.length ?
							<div className={listView && !isItemPage ?
									itemType === 'ephemera' && !related ?
									'col-sm-4 order-3 offset-sm-4' :
									'col-sm-4 order-3' : ''}>
								<div className={listView && !isItemPage ?
									'list-center-wrapper' : null}>
									<div className="tags-wrapper">
										<ClampedDescription className="tags" maxLines={1}>
											{tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}
										</ClampedDescription>
									</div>
								</div>
							</div>
							: null
						}
						{
							related && related.length ?
							<div className={listView ? 'col-sm-4' : ''}>
								<ClampedDescription
									className="list-center-wrapper no-gutters"
									maxLines={listView ? 3 : 2}>
								<RelatedLinks
									label="Related">
									{related.map((rel, i) =>
										<RelatedLink
											key={i}
											isLast={i === related.length - 1}
											to={`/${rel.itemType.toLowerCase().replace(' ','-')}/${rel.id}`}>
											<span title={rel.displayName}>{rel.displayName}</span>
										</RelatedLink>
									)}
								</RelatedLinks>
								</ClampedDescription>
							</div>
							: null
						}
					</div>
				</div>
				</div>
			</div>
		);
	}
}

export default withRouter(SearchCard);
