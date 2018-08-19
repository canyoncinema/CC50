import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
	getDisplayNameFromMatch,
	getShortIdentifierFromMatch,
	matchRefName
} from '../../utils/parse-data';

const RefNameLink = ({ collection, refName, children }) => {
	const match = refName && matchRefName(refName);
	return (
		<Link
			to={`/collection/${collection}/${getShortIdentifierFromMatch(match)}`}
			className="RefNameLink gold"
			title={getDisplayNameFromMatch(match)}>
			{children ? children : getDisplayNameFromMatch(match)}
		</Link>
	);
}

export default withRouter(RefNameLink);