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
		this.titleRef = React.createRef();
		this.descriptionRef = React.createRef();
		this.filmmakersRef = React.createRef();
		this.relatedRef = React.createRef();
		this.tagsRef = React.createRef();

		this.clampLines = this.clampLines.bind(this);
	}

	clampLines() {
		const itemType = this.props.itemType.toLowerCase(),
					listView = this.props.viewMode === 'list';
		let maxTitleLines, maxDescriptionLines;
		if (itemType === 'filmmaker') {
			maxTitleLines = 1;
			maxDescriptionLines = listView ? 3 : 6;
		} else if (itemType === 'ephemera') {
			maxTitleLines = listView ? 2 : 3;
			maxDescriptionLines = 3;
		} else {
			maxTitleLines = listView && itemType === 'film' ? 1 : 2;
			maxDescriptionLines = 3;
		}

		// TODO: debug line clamp lib (removes title if clamps 1 line)
		// TODO: debug hack with 2 line clamp libs :(
		if (this.titleRef && this.titleRef.current) {
			// TODO: HACK -- lineClamp does not behave well with 1 line clamps
			if (maxTitleLines > 1) {
				lineClamp(this.titleRef.current, maxTitleLines);
			} else {
				$clamp(this.titleRef.current, { clamp: maxTitleLines });
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
			title,
			description,
			creator,
			filmmakers,
			avatar,
			year,
			tags,
			related,
			viewMode,
			history
		} = this.props;
		const itemTypeClassName = itemType.toLowerCase().replace(' ', '-');
		const listView = viewMode === 'list';
		return (
			<div
				className={[
					'SearchCard',
					itemTypeClassName,
					listView ? 'list' : 'grid'
					].join(' ')}
				onClick={(e) => {
					e.stopPropagation();
					const path = `/collection/${itemTypeToCollectionSearchVal(itemType)}/${id}`;
					history.push(path);
				}}>
				<Row className="no-gutters">
				<Col sm={listView ? 2 : 12}>
					<div className="media">
						<Carousel
							photos={(photos || []).slice(0, MAX_CAROUSEL_IMAGES)}
							id={id}
							title={title}
							itemType={itemType} />
					</div>
				</Col>
				<Col sm={listView ? 10 : 12}>
					<Row className="no-gutters content">
						<Col sm={listView ? 4 : 12} className="main">
							<div className={itemType === 'filmmaker' ? 'd-flex' : null}>
								{
									itemType === 'filmmaker' ?
									<div className="avatar">
										<FilmmakerAvatar url={avatar} />
									</div>
									: null
								}
								<div>
									<h6>{itemType}</h6>
									<h4 className="d-flex">
										<div className="title"
											ref={this.titleRef}
											title={title + (year ? ` (${year})` : '')}>
											{listView ? title + (year ? ` (${year})` : '') : title}
										</div>
										{
											year && !listView ?
											<span className="year ml-auto">{year}</span>
											: null
										}
									</h4>
								</div>
							</div>
							{
								creator ?
								<div className="creator" title={creator.displayName}>
									<a className="gold" onClick={(e) => {
										e.stopPropagation();
										const path = `/collection/filmmakers/${creator.id}`;
										history.push(path);
									}}>
										{creator.displayName}
									</a>
								</div>
								: null
							}
						</Col>
							{
								description ?
								<Col sm={listView ?
									itemType === 'filmmaker' ||
									(itemType === 'film' && (!tags || !tags.length)) ||
									(itemType === 'program' && (!filmmakers || !filmmakers.length))
									?
										8 : 4
									: 12}>
									<div className="list-center-wrapper">
										<div className="descriptive">
											<p className="small"
												ref={this.descriptionRef}>
												{description}
											</p>
										</div>
									</div>
								</Col>
								: null
							}
							{
								filmmakers && filmmakers.length ?
								<Col className="filmmakers" sm={listView ? 4 : 12}>
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
								</Col>
								: null
							}
						{
							tags && tags.length ?
							<Col sm={listView ? 4 : 12}
								className={
									listView && itemTypeClassName === 'ephemera' ?
										!related || !related.length ?
											'offset-sm-4 order-3' :
											'order-3' :
									listView && itemTypeClassName === 'film' ?
										!description ? 'offset-sm-4' : null :
									null}>
								<div className="list-center-wrapper">
									<div className="tags-wrapper">
										<div className="tags" ref={this.tagsRef}>
											{tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}
										</div>
									</div>
								</div>
							</Col>
							: null
						}
						{
							related && related.length ?
							<Col sm={listView ? 4 : 12}>
								<div className="list-center-wrapper no-gutters" ref={this.relatedRef}>
								<RelatedLinks
									label="Related">
									{related.map((rel, i) =>
										<RelatedLink
											key={i}
											isLast={i === related.length - 1}
											to={`/${rel.itemType.toLowerCase().replace(' ','-')}/${rel.id}`}>
											<span title={rel.title}>{rel.title}</span>
										</RelatedLink>
									)}
								</RelatedLinks>
								</div>
							</Col>
							: null
						}
					</Row>
				</Col>
				</Row>
			</div>
		);
	}
}

export default withRouter(SearchCard);
