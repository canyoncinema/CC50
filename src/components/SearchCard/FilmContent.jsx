import React, { Component } from 'react';
import { history } from '../../store';

import Tag from '../Tag/Tag';
import FilmTags from '../FilmTags/FilmTags';
import FilmmakerAvatar from '../FilmmakerAvatar/FilmmakerAvatar';
import ClampedDescription from '../ClampedDescription/ClampedDescription';
import URNRelatedField from '../URNRelatedField/URNRelatedField';
import ChildrenOnly from '../ChildrenOnly/ChildrenOnly';
import CreatorLink from '../CreatorLink/CreatorLink';
import ReactMarkdown from 'react-markdown';

class FilmContent extends Component {
	render() {
		const {
			item,
			viewMode,
			isItemPageFilmCard
		} = this.props;
		const listView = viewMode === 'list';
		return (
			<div className={listView && !isItemPageFilmCard ? 'row no-gutters FilmContent' : 'FilmContent'}>
				<div className={listView && !isItemPageFilmCard ? 'col-4' : null}>
					{	!isItemPageFilmCard ?
						<h6>Film</h6>
						: null
					}
					<h4 className="d-flex">
						<ClampedDescription
							className="displayName"
							maxLines={listView ? 1 : 2}
							title={item.termDisplayName + (item.creationYear ? ` (${item.creationYear})` : '')}>
							<ReactMarkdown source={
								listView && !isItemPageFilmCard ?
								item.termDisplayName + (item.creationYear ? ` (${item.creationYear})` : '') :
								item.termDisplayName
							} renderers={{
								'paragraph': ChildrenOnly,
								'root': ChildrenOnly
							}} />
						</ClampedDescription>
						{
							listView && !isItemPageFilmCard ? null :
							<span className="year ml-auto">{item.creationYear}</span>
						}
					</h4>
					{
						item.creator && !isItemPageFilmCard ?
						<div className="creator">
							<CreatorLink creatorRefName={item.creator} />
						</div>
						: null
					}
				</div>
				<div className={listView && !isItemPageFilmCard ?
					'col-4' : null}>
					<div className={listView && !isItemPageFilmCard ? 'list-center-wrapper' : null}>
						<ClampedDescription
							className="description formatted-text"
							maxLines={3}>
							<ReactMarkdown source={item.shortDescription}
								renderers={{
								'paragraph': ChildrenOnly,
								'root': ChildrenOnly
							}} />
						</ClampedDescription>
					</div>
				</div>
				{
					<div className={listView && !isItemPageFilmCard ?
													'col-4 order-3' : null}>
						<div className={listView && !isItemPageFilmCard ?
							'list-center-wrapper' : null}>
							<div className="tags-wrapper">
								<FilmTags film={item} />
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}

export default FilmContent;

