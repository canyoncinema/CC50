import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import {
  withRouter
} from 'react-router-dom';
import './SearchCard.css';
import $clamp from 'clamp-js';
import lineClamp from 'line-clamp';

import { itemTypeToCollectionSearchVal } from '../../collection-context';
import Tag from '../Tag/Tag';
import FilmmakerAvatar from '../FilmmakerAvatar/FilmmakerAvatar';
import Carousel, { MAX_CAROUSEL_IMAGES } from '../Carousel/Carousel';
import RelatedLinks from '../RelatedLinks/RelatedLinks';
import RelatedLink from '../RelatedLink/RelatedLink';

class SearchCard extends Component {
	constructor(props) {
		super(props);
		this.displayNameRef = React.createRef();
		this.descriptionRef = React.createRef();
		this.filmmakersRef = React.createRef();
		this.relatedRef = React.createRef();
		this.tagsRef = React.createRef();

		this.clampLines = this.clampLines.bind(this);
	}

	clampLines() {
		const listView = this.props.viewMode === 'list';
		let maxDisplayNameLines, maxDescriptionLines;
		if (this.props.isFilmmakerPage) {
			maxDescriptionLines = listView ? 2 : 3;
			maxDisplayNameLines = listView ? 1 : 2;
		} else {
			const itemType = this.props.itemType.toLowerCase();
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

		// TODO: debug line clamp lib (removes title if clamps 1 line)
		// TODO: debug hack with 2 line clamp libs :(
		if (this.displayNameRef && this.displayNameRef.current) {
			// TODO: HACK -- lineClamp does not behave well with 1 line clamps
			if (maxDisplayNameLines > 1) {
				lineClamp(this.displayNameRef.current, maxDisplayNameLines);
			} else {
				$clamp(this.displayNameRef.current, { clamp: maxDisplayNameLines });
			}
		}

		if (this.descriptionRef && this.descriptionRef.current) {
			$clamp(this.descriptionRef.current, { clamp: maxDescriptionLines });
			// lineClamp(this.descriptionRef.current, maxDescriptionLines);
		}

		if (this.filmmakersRef && this.filmmakersRef.current) {
			$clamp(this.filmmakersRef.current, { clamp: listView ? 3 : 2 });	
			// lineClamp(this.filmmakersRef.current, 2);
		}

		// HACK: stupid refs on stateless components
		// const related = document.querySelectorAll('.RelatedLinks');
		if (this.relatedRef && this.relatedRef.current) {
			// $clamp(this.relatedRef.current, { clamp: 2 });	
			$clamp(this.relatedRef.current, { clamp: listView ? 3 : 2 });
		}

		if (this.tagsRef && this.tagsRef.current) {
			$clamp(this.tagsRef.current, { clamp: 1 });	
			// lineClamp(this.tagsRef.current, 1);
		}
	}

  componentDidMount() {
  	this.clampLines();
  }

	componentDidUpdate() {
		this.clampLines();
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
			history,
			isFilmmakerPage
		} = this.props;
		// Note: certain design rules exist for cards on filmmaker pages.
		// See Cards design spec.
		const itemTypeClassName = itemType.toLowerCase().replace(' ', '-');
		const listView = viewMode === 'list';
	
		console.log('viewMode', viewMode);
		return (
			<div
				className={[
					'SearchCard',
					itemTypeClassName,
					isFilmmakerPage ? 'on-filmmaker-page': null,
					viewMode,
					].join(' ')}
				onClick={(e) => {
					e.stopPropagation();
					const path = `/collection/${itemTypeToCollectionSearchVal(itemType)}/${id}`;
					history.push(path);
				}}>
				<div className={listView && !isFilmmakerPage ? 'row no-gutters' : 'no-gutters'}>
				<div className={listView ? isFilmmakerPage ? 'filmmaker-film-still' :  'col-sm-2' : ''}>
					<div className="media">
						<Carousel
							photos={(photos || []).slice(0, MAX_CAROUSEL_IMAGES)}
							id={id}
							title={displayName}
							itemType={itemType} />
					</div>
				</div>
				<div className={listView ? isFilmmakerPage ? 'filmmaker-content' : 'col-sm-10' : ''}>
					<div className={listView && !isFilmmakerPage ? 'row no-gutters content' : 'no-gutters content'}>
						<div className={listView && !isFilmmakerPage ? 'col-sm-4 main' : 'main'}>
							<div className={itemType === 'filmmaker' ? 'd-flex' : null}>
								{
									itemType === 'filmmaker' ?
									<div className="avatar">
										<FilmmakerAvatar url={avatar} />
									</div>
									: null
								}
								<div>
									{	!isFilmmakerPage ?
										<h6>{itemType}</h6>
										: null
									}
									<h4 className="d-flex">
										<div className="displayName"
											ref={this.displayNameRef}
											title={displayName + (year ? ` (${year})` : '')}>
											{listView && !isFilmmakerPage ?
												displayName + (year ? ` (${year})` : '') :
												displayName}
										</div>
										{
											listView && !isFilmmakerPage ? null :
											<span className="year ml-auto">{year}</span>
										}
									</h4>
								</div>
							</div>
							{
								filmmaker && !isFilmmakerPage ?
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
							<div className={listView && !isFilmmakerPage ?
								itemType === 'filmmaker' ||
								(itemType === 'film' && (!tags || !tags.length)) ||
								(itemType === 'program' && (!filmmakers || !filmmakers.length))
								?
									'col-sm-8' : 'col-sm-4'
								: null}>
								<div className={listView && !isFilmmakerPage ? 'list-center-wrapper' : null}>
									<p className="small description"
										ref={this.descriptionRef}>
										{description}
									</p>
								</div>
							</div>
							{
								filmmakers && filmmakers.length ?
								<div className={listView ? 'col-sm-4 filmmakers' : 'filmmakers'}>
									<div className="no-gutters" ref={this.filmmakersRef}>
										<RelatedLinks
											label="Filmmakers">
											{filmmakers.map((filmmaker, i) =>
												<RelatedLink
													key={i}
													isLast={i === filmmakers.length - 1}
													to={`/filmmaker/${filmmaker.id}`}>
													<span title={filmmaker.name}>{filmmaker.name}</span>
												</RelatedLink>
											)}
										</RelatedLinks>
									</div>
								</div>
								: null
							}
						{
							tags && tags.length ?
							<div className={listView && !isFilmmakerPage ? 'col-sm-4 order-3' : ''}>
								<div className={listView && !isFilmmakerPage ?
									'list-center-wrapper' : null}>
									<div className="tags-wrapper">
										<div className="tags" ref={this.tagsRef}>
											{tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}
										</div>
									</div>
								</div>
							</div>
							: null
						}
						{
							related && related.length ?
							<div className={listView ? 'col-sm-4' : ''}>
								<div className="list-center-wrapper no-gutters" ref={this.relatedRef}>
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
								</div>
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
