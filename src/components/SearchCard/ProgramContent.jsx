import React from 'react';
<<<<<<< HEAD
=======
import { history } from '../../store';
>>>>>>> feature-add-redux2

import RelatedLinks from '../RelatedLinks/RelatedLinks';
import RelatedLink from '../RelatedLink/RelatedLink';
import ClampedDescription from '../ClampedDescription/ClampedDescription';

const ProgramContent = ({
	viewMode,
	displayName,
	description,
	filmmakers
}) => {
	const listView = viewMode === 'list';
	return (
<<<<<<< HEAD
		<div className="FilmContent">
			<h6>Curated Program</h6>
			<h4>
				<ClampedDescription
					className="displayName"
					maxLines={2}
					title={displayName}>
					{displayName}
				</ClampedDescription>
			</h4>
			<div className={listView ? 'col-sm-8' : null}>
=======
		<div className={listView ? 'row ProgramContent' : 'ProgramContent'}>
			<div className={listView ? 'col-4' : null}>
				<h6>Curated Program</h6>
				<h4>
					<ClampedDescription
						className="displayName"
						maxLines={2}
						title={displayName}>
						{displayName}
					</ClampedDescription>
				</h4>
			</div>
			<div className={listView ? filmmakers && filmmakers.length ? 'col-4' : 'col-8' : null}>
>>>>>>> feature-add-redux2
				<div className={listView ? 'list-center-wrapper' : null}>
					<ClampedDescription
						className="description"
						maxLines={3}>
						{description}
					</ClampedDescription>
				</div>
			</div>
			{
				filmmakers && filmmakers.length ?
<<<<<<< HEAD
				<div className={listView ? 'col-sm-4 filmmakers' : 'filmmakers'}>
=======
				<div className={listView ? 'col-4 filmmakers' : 'filmmakers'}>
>>>>>>> feature-add-redux2
					<div className="no-gutters">
						<ClampedDescription
							className="no-gutters"
							maxLines={listView ? 3 : 2}>
							<RelatedLinks
								label="Filmmakers">
								{filmmakers.map((filmmaker, i) =>
									<RelatedLink
										key={i}
										isLast={i === filmmakers.length - 1}
										to={`/filmmaker/${filmmaker.id}`}>
										<span title={filmmaker.displayName}>{filmmaker.displayName}</span>
									</RelatedLink>
								)}
							</RelatedLinks>
						</ClampedDescription>
					</div>
				</div>
				: null
			}
		</div>
	);
}

export default ProgramContent;