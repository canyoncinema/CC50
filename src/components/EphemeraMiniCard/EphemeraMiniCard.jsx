import React from 'react';
import { Link } from 'react-router-dom';

const EphemeraMiniCard = ({ shortIdentifier, termDisplayName }) =>
	<div>Ephemera: <Link to={`/collection/ephemera/${shortIdentifier}`}>
		{termDisplayName}
	</Link>
	</div>

export default EphemeraMiniCard;
