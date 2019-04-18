import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FilmTags from '../FilmTags/FilmTags';
import ClampedDescription from '../ClampedDescription/ClampedDescription';
import ChildrenOnly from '../ChildrenOnly/ChildrenOnly';
import RefNameLink from '../RefNameLink/RefNameLink';
import ReactMarkdown from 'react-markdown';

class FilmContent extends Component {
	renderTags(listView) {
		const { isItemPageFilmCard, item } = this.props;
		return listView ?
			isItemPageFilmCard ?
				<FilmTags film={item} />
			:
			<div className="col-4 order-3">
				<div className="list-center-wrapper">
					<div className="tags-wrapper">
						<FilmTags film={item} />
					</div>
				</div>
			</div>
		:
		<div className="tags-wrapper">
			<FilmTags film={item} />
		</div>;
	}
	render() {
		const {
			item,
			viewMode,
			isItemPageFilmCard,
			hideTags,
			showFilmFilmmaker
		} = this.props;
		const displayTags = !hideTags && !showFilmFilmmaker;
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
							className="displayName formatted-text"
							maxLines={listView ? 1 : 2}
							>
							<ReactMarkdown source={
                                item.termDisplayName
                                // listView && !isItemPageFilmCard ?
								// item.shortTitle + (item.creationYear ? ` (${item.creationYear})` : '') :
								// item.shortTitle
								// item.termDisplayName + (item.creationYear ? ` (${item.creationYear})` : '') :
								// item.termDisplayName
							} renderers={{
								'paragraph': ChildrenOnly,
								'root': ChildrenOnly
							}} />
						</ClampedDescription>
						{/*{*/}
							{/*listView && !isItemPageFilmCard ? null :*/}
							{/*<span className="year ml-auto">{item.creationYear}</span>*/}
						{/*}*/}
					</h4>
					{
						item.creator && (showFilmFilmmaker || !isItemPageFilmCard) ?
						<div className="creator">
							<RefNameLink collection="filmmakers" refName={item.creator} />
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
					displayTags ? this.renderTags(listView) : null
				}
			</div>
		);
	}
}

export default FilmContent;

