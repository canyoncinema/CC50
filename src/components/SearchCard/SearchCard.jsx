import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './SearchCard.css';
import $clamp from 'clamp-js';

import CollectionContext from '../../collection-context';
import Tag from '../Tag/Tag';
import FilmmakerAvatar from '../FilmmakerAvatar/FilmmakerAvatar';
import Carousel from '../Carousel/Carousel';
import RelatedLinks from '../RelatedLinks/RelatedLinks';
import RelatedLink from '../RelatedLink/RelatedLink';

class SearchCard extends Component {
	constructor(props) {
		super(props);
		this.titleRef = React.createRef();
		this.descriptionRef = React.createRef();
		this.filmmakersRef = React.createRef();
	}

	componentDidMount() {
		const itemType = this.props.itemType.toLowerCase();
		if (itemType === 'filmmaker') {
			var maxTitleLines = 1,
					maxDescriptionLines = 6;
		} else if (itemType === 'ephemera') {
			var maxTitleLines = 3,
					maxDescriptionLines = 3;
		} else {
			var maxTitleLines = 2,
					maxDescriptionLines = 3;
		}
		console.log(itemType, maxTitleLines);

		if (this.titleRef && this.titleRef.current) {
			$clamp(this.titleRef.current, { clamp: maxTitleLines });
		}

		if (this.descriptionRef && this.descriptionRef.current) {
			$clamp(this.descriptionRef.current, { clamp: maxDescriptionLines });
		}

		if (this.filmmakersRef && this.filmmakersRef.current) {
			$clamp(this.filmmakersRef.current, { clamp: 2 });	
		}

		if (this.relatedRef && this.relatedRef.current) {
			$clamp(this.relatedRef.current, { clamp: 2 });	
		}
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
		} = this.props;
		const itemTypeClassName = itemType.toLowerCase().replace(' ', '-');
		return (
			<CollectionContext.Consumer>
			{
				context => {
				const listView = context.viewMode === 'list';
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
									photos={(photos || []).slice(0, 5)}
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
												<span className="title"
													ref={this.titleRef}>
													{listView ? title + (year ? ` (${year})` : '') : title}
												</span>
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
										<Col sm={listView ? 4 : 12} className="descriptive">
											<p className="small"
												ref={this.descriptionRef}>
												{description}
											</p>
										</Col>
										: null
									}
								{
									filmmakers && filmmakers.length ?
									<Col sm={listView ? 4 : 12} ref={this.filmmakersRef}>
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
									</Col>
									: null
								}
								{
									related && related.length ?
									<Col sm={listView ? 4 : 12} ref={this.relatedRef}>
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
									</Col>
									: null
								}
								{
									tags && tags.length ?
									<Col sm={listView ? 4 : 12} className="tags">
										{
											tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)
										}
									</Col>
									: null
								}
							</Row>
						</Col>
						</Row>
					</Col>
				)}
			}
			</CollectionContext.Consumer>
		);
	}
}

export default SearchCard;
