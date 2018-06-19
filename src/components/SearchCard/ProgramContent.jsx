import React from 'react';
import { history } from '../../store';

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
				<div className={listView ? 'col-sm-4 filmmakers' : 'filmmakers'}>
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