import React from 'react';
import './FilmmakerContent.css';
import ReactMarkdown from 'react-markdown';

import FilmmakerAvatar from '../FilmmakerAvatar/FilmmakerAvatar';
import ClampedDescription from '../ClampedDescription/ClampedDescription';

const FilmmakerContent = ({
	item,
	termDisplayName,
	viewMode,
	avatar,
	shortBioNote,
	isItemPage
}) => {
	const listView = viewMode === 'list';
	return (
		<div className={listView ? 'row no-gutters FilmmakerContent' : 'FilmmakerContent'}>
			<div className={listView ? 'person d-flex col-4' : 'person d-flex'}>
				<div className="avatar">
					<FilmmakerAvatar url={avatar} />
				</div>
				<div>
					{	!isItemPage ?
						<h6>Filmmaker</h6>
						: null
					}
					<h4 className="d-flex">
						<ClampedDescription
							className="displayName"
							maxLines={1}
							title={item.termDisplayName}>
							{item.termDisplayName}
						</ClampedDescription>
					</h4>
				</div>
			</div>
			{
				listView && !isItemPage ?
				<div className="col-8">
					<div className="list-center-wrapper">
						<ClampedDescription
							className="description formatted-text"
							maxLines={listView ? 3 : 6}>
							<ReactMarkdown source={item.shortBioNote} />
						</ClampedDescription>
					</div>
				</div>
				:
				<ClampedDescription
					className="description"
					maxLines={listView ? 3 : 6}>
					{item.shortBioNote}
				</ClampedDescription>
			}
		</div>
	);
}

export default FilmmakerContent;