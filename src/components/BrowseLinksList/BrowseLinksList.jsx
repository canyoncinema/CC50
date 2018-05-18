import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './BrowseLinksList.css';

import BrowseLink from '../BrowseLink/BrowseLink';

export default ({}) => {
	return (
		<div className="BrowseLinksList">
			<BrowseLink text="Films" search="films" />
			<BrowseLink text="Filmmakers" search="films" />
			<BrowseLink text="Curated Programs" search="films" />
			<BrowseLink text="Ephemera" search="films" />
			<BrowseLink text="Everything" />
    </div>
	);
};