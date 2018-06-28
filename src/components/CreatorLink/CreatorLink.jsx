import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
	getDisplayNameFromMatch,
	getShortIdentifierFromMatch,
	matchRefName
} from '../../utils/parse-data';

const CreatorLink = ({ history, creatorRefName }) => {
	const creatorMatch = creatorRefName && matchRefName(creatorRefName);
	console.log('creatorMatch', creatorMatch)
	return (
		<Link
			to={`/collection/filmmakers/${getShortIdentifierFromMatch(creatorMatch)}`}
			className="CreatorLink gold"
			title={getDisplayNameFromMatch(creatorMatch)}>
			{getDisplayNameFromMatch(creatorMatch)}
		</Link>
	);
}

export default withRouter(CreatorLink);