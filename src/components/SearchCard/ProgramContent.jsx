import React from 'react';

import RelatedLinks from '../RelatedLinks/RelatedLinks';
import RelatedLink from '../RelatedLink/RelatedLink';
import ClampedDescription from '../ClampedDescription/ClampedDescription';
import ReactMarkdown from 'react-markdown';

// TODO: remove manual clipping and use clamped content


const ProgramContent = ({
	viewMode,
	termDisplayName,
	scopeNote,
	filmmakers,
}) => {
	const listView = viewMode === 'list';
	// TODO: not getting a shortDescription back from server like for other collections...
	// const shortScopeNote = scopeNote.substring(0, 160)+'...';
	return (
		<div className={listView ? 'row no-gutters ProgramContent' : 'ProgramContent'}>
			<div className={listView ? 'col-4' : null}>
				<h6>Curated Program</h6>
				<h4>
					<ClampedDescription
						className="displayName"
						maxLines={2}
						title={termDisplayName}>
						<ReactMarkdown source={termDisplayName} />
					</ClampedDescription>
				</h4>
			</div>
			<div className={listView ? filmmakers && filmmakers.length ? 'col-4' : 'col-8' : null}>
				<div className={listView ? 'list-center-wrapper' : null}>
					<ClampedDescription
						className="description formatted-text"
						maxLines={3}>
						<ReactMarkdown source={scopeNote}/>
					</ClampedDescription>
				</div>
			</div>
			{
				filmmakers && filmmakers.length ?
				<div className={listView ? 'col-4 filmmakers' : 'filmmakers'}>
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
										<span title={filmmaker.termDisplayName}>{filmmaker.termDisplayName}</span>
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