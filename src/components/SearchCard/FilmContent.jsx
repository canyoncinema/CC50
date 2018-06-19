import React from 'react';
import { withRouter } from 'react-router-dom';

import Tag from '../Tag/Tag';
import FilmmakerAvatar from '../FilmmakerAvatar/FilmmakerAvatar';
import ClampedDescription from '../ClampedDescription/ClampedDescription';

const FilmContent = ({
	displayName,
	year,
	viewMode,
	creator,
	tags,
	description,
	shortBioNote,
	isItemPage,
	history
}) => {
	const listView = viewMode === 'list';
	return (
		<div className="FilmContent">
			{	!isItemPage ?
				<h6>Film</h6>
				: null
			}
			<h4 className="d-flex">
				<ClampedDescription
					className="displayName"
					maxLines={listView ? 1 : 2}
					title={displayName + (year ? ` (${year})` : '')}>
					{
						listView && !isItemPage ?
						displayName + (year ? ` (${year})` : '') :
						displayName
					}
				</ClampedDescription>
				{
					listView && !isItemPage ? null :
					<span className="year ml-auto">{year}</span>
				}
			</h4>
			{
				creator && !isItemPage ?
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
			<div className={listView && !isItemPage ?
				'col-sm-8' : null}>
				<div className={listView && !isItemPage ? 'list-center-wrapper' : null}>
					<ClampedDescription
						className="description"
						maxLines={3}>
						{description}
					</ClampedDescription>
				</div>
			</div>
			{
				tags && tags.length ?
				<div className={listView && !isItemPage ?
												'col-sm-4 order-3' : null}>
					<div className={listView && !isItemPage ?
						'list-center-wrapper' : null}>
						<div className="tags-wrapper">
							<ClampedDescription
								className="tags"
								maxLines={1}>
								{
									tags.map((tag, i) =>
									<Tag key={i}>{tag}</Tag>)
								}
							</ClampedDescription>
						</div>
					</div>
				</div>
				: null
			}
		</div>
	);
}

export default withRouter(FilmContent);