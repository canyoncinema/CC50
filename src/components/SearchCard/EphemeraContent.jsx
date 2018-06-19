import React from 'react';
import { history } from '../../store';

import Tag from '../Tag/Tag';
import RelatedLinks from '../RelatedLinks/RelatedLinks';
import RelatedLink from '../RelatedLink/RelatedLink';
import ClampedDescription from '../ClampedDescription/ClampedDescription';

const EphemeraContent = ({
	displayName,
	viewMode,
	related,
	tags
}) => {
	const listView = viewMode === 'list';
	return (
		<div className="FilmContent">
			<h6>Ephemera</h6>
			<h4>
				<ClampedDescription
					className="displayName"
					maxLines={listView ? 2 : 3}
					title={displayName}>
					{displayName}
				</ClampedDescription>
			</h4>
			{
				tags && tags.length ?
				<div className={listView ? 'col-sm-4 order-3' : null}>
					<div className={listView ? 'list-center-wrapper' : null}>
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
			{
				related && related.length ?
				<div className={listView ? 'col-sm-4' : ''}>
					<ClampedDescription
						className="list-center-wrapper no-gutters"
						maxLines={listView ? 3 : 2}>
					<RelatedLinks
						label="Related">
						{related.map((rel, i) =>
							<RelatedLink
								key={i}
								isLast={i === related.length - 1}
								to={`/${rel.itemType.toLowerCase().replace(' ','-')}/${rel.id}`}>
								<span title={rel.displayName}>{rel.displayName}</span>
							</RelatedLink>
						)}
					</RelatedLinks>
					</ClampedDescription>
				</div>
				: null
			}
		</div>
	);
}

export default EphemeraContent;