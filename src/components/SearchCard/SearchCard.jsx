import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SearchCard.css';
import $clamp from 'clamp-js';

import Tag from '../Tag/Tag';
import FilmmakerAvatar from '../FilmmakerAvatar/FilmmakerAvatar';
import Carousel from '../Carousel/Carousel';

class SearchCard extends Component {
	constructor(props) {
		super(props);
		this.titleRef = React.createRef();
		this.descriptionRef = React.createRef();
		this.filmmakersRef = React.createRef();
	}

	componentDidMount() {
		var maxTitleLines = this.props.itemType === 'filmmaker' ? 1 : 2;
		var maxDescriptionLines = this.props.itemType === 'filmmaker' ? 6 : 3;

		if (this.titleRef && this.titleRef.current) {
			$clamp(this.titleRef.current, { clamp: maxTitleLines });
		}

		if (this.descriptionRef && this.descriptionRef.current) {
			console.log('clamp description', this.props.itemType, maxDescriptionLines, this.descriptionRef.current);
			$clamp(this.descriptionRef.current, { clamp: maxDescriptionLines });
		}

		if (this.filmmakersRef && this.filmmakersRef.current) {
			$clamp(this.filmmakersRef.current, { clamp: 2 });	
		}
	}

	render() {
		const {
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
		console.log('filmmakers', filmmakers);
		return (
			<div className={'SearchCard ' + itemTypeClassName}>
				<div className="media">
					<Carousel photos={photos} />
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
							<Link to="filmmaker/">{creator}</Link>
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
						<div className="filmmakers"
							ref={this.filmmakersRef}>
							<label className="filmmakers-label">Filmmakers:</label>
							{filmmakers.map((filmmaker, i) =>
								<span key={i}>
									<Link to={`/filmmaker/${filmmaker.id}`}>
										{filmmaker.name}
										{i !== filmmakers.length - 1 ? ', ' : null}
									</Link>
								</span>
							)}
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
				</div>
			</div>
		);
	}
}

export default SearchCard;
