import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './SearchCard.css';
import $clamp from 'clamp-js';
import lineClamp from 'line-clamp';

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

	shouldComponentUpdate(nextProps, nextState) {
		// all content should stay the same, unless
		// clamping diff length lines depending on switched view mode
		return nextProps.viewMode !== this.props.viewMode;
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
			viewMode
		} = this.props;
		const itemTypeClassName = itemType.toLowerCase().replace(' ', '-');
		const listView = viewMode === 'list';
		return (
			<Col sm={ listView ? 12 : 4 }
				className={[
					'SearchCard',
					'no-gutters',
					itemTypeClassName,
					listView ? 'list' : 'tile'
					].join(' ')}>
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
						<Col sm={listView ? 4 : 12} className={listView ? 'main' : null}>
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
											ref={this.titleRef}>
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
								<div className="creator">
									<Link to="filmmaker/" className="gold">{creator}</Link>
								</div>
								: null
							}
						</Col>
							{
								description ?
								<Col sm={listView ? itemTypeClassName === 'filmmaker' ? 8 : 4 : 12}>
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
							<Col sm={listView ? 4 : 12}>
								<div className="no-gutters" ref={this.filmmakersRef}>
								<RelatedLinks
									label="Filmmakers">
									{filmmakers.map((filmmaker, i) =>
										<RelatedLink
											key={i}
											isLast={i === filmmakers.length - 1}
											to={`/filmmaker/${filmmaker.id}`}>
											{filmmaker.name}
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
								className={listView && itemTypeClassName === 'ephemera' ? 'order-3' : null}>
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
											{rel.title}
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
			</Col>
		);
	}
}

export default SearchCard;
