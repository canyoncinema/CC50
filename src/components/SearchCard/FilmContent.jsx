import React, { Component } from 'react';
import { history } from '../../store';
import {
	getDisplayNameFromMatch,
	getShortIdentifierFromMatch,
	yearsFromyear,
	matchRefName,
	getNameFromFilmFormat,
	getFilmColor,
	getFilmSound
} from '../../utils/parse-data';

import Tag from '../Tag/Tag';
import FilmmakerAvatar from '../FilmmakerAvatar/FilmmakerAvatar';
import ClampedDescription from '../ClampedDescription/ClampedDescription';
import URNRelatedField from '../URNRelatedField/URNRelatedField';
import ReactMarkdown from 'react-markdown';

class FilmContent extends Component {
	state = {
		creator: null
	}

	setCreator = creator => {
		this.setState({
			creator
		});
	}

	render() {
		const {
			item,
			viewMode,
			isItemPage
		} = this.props;
		const { creator } = this.state;
		const creatorMatch = item.creator && matchRefName(item.creator);
		const listView = viewMode === 'list';
		return (
			<div className={listView && !isItemPage ? 'row no-gutters FilmContent' : 'FilmContent'}>
				<div className={listView && !isItemPage ? 'col-4' : null}>
					{	!isItemPage ?
						<h6>Film</h6>
						: null
					}
					<h4 className="d-flex">
						<ClampedDescription
							className="displayName"
							maxLines={listView ? 1 : 2}
							title={item.termDisplayName + (item.creationYear ? ` (${item.creationYear})` : '')}>
							<ReactMarkdown source={
								listView && !isItemPage ?
								item.termDisplayName + (item.creationYear ? ` (${item.creationYear})` : '') :
								item.termDisplayName
							} />
						</ClampedDescription>
						{
							listView && !isItemPage ? null :
							<span className="year ml-auto">{item.creationYear}</span>
						}
					</h4>
					{
						creatorMatch && !isItemPage ?
						<div className="creator" title={getDisplayNameFromMatch(creatorMatch)}>
							<a className="gold" onClick={(e) => {
								e.stopPropagation();
								const path = `/collection/filmmakers/${getShortIdentifierFromMatch(creatorMatch)}`;
								history.push(path);
							}}>
								{getDisplayNameFromMatch(creatorMatch)}
							</a>
						</div>
						: null
					}
				</div>
				<div className={listView && !isItemPage ?
					'col-4' : null}>
					<div className={listView && !isItemPage ? 'list-center-wrapper' : null}>
						<ClampedDescription
							className="description formatted-text"
							maxLines={3}>
							<ReactMarkdown source={item.shortDescription} />
						</ClampedDescription>
					</div>
				</div>
				{
					<div className={listView && !isItemPage ?
													'col-4 order-3' : null}>
						<div className={listView && !isItemPage ?
							'list-center-wrapper' : null}>
							<div className="tags-wrapper">
								<div className="tags">
									{
										item.originalFormat ?
										<Tag>{getNameFromFilmFormat(item.originalFormat)}</Tag>
										: null
									}
									{
										item.creationYear ?
										<Tag>{yearsFromyear(item.creationYear)}</Tag>
										: null
									}
									{
										item.color ?
										<Tag>{getFilmColor(item.color)}</Tag>
										: null
									}
									{
										item.sound ?
										<Tag>{getFilmSound(item.sound)}</Tag>
										: null
									}
								</div>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}

export default FilmContent;

