import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SearchCard.css';
import $clamp from 'clamp-js';

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
			related
		} = this.props;
		const itemTypeClassName = itemType.toLowerCase().replace(' ', '-');
		return (
			<div className={'SearchCard ' + itemTypeClassName}>
				<div className="media">
					<Carousel
						photos={(photos || []).slice(0, 5)}
						id={id}
						title={title}
						itemType={itemType} />
				</div>
				<div className="content">
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
									{title}
								</span>
								{
									year ?
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
					{
						description ?
						<p className="small"
							ref={this.descriptionRef}>
							{description}
						</p>
						: null
					}
					{
						filmmakers && filmmakers.length ?
						<div ref={this.filmmakersRef}>
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
						: null
					}
					{
						tags && tags.length ?
						<div className="tags">
							{
								tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)
							}
						</div>
						: null
					}
					{
						related && related.length ?
						<div ref={this.relatedRef}>
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
						: null
					}
				</div>
			</div>
		);
	}
}

export default SearchCard;
