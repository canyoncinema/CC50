import React from 'react';
import './BrowseLinksList.css';

import BrowseLink from '../BrowseLink/BrowseLink';

export default () => {
	return (
		<div className="BrowseLinksList">
            <BrowseLink text="Ephemera" search="ephemera" />
            <BrowseLink text="Curated Programs" search="programs" />
			<BrowseLink text="Films" search="films" />
			<BrowseLink text="Filmmakers" search="filmmakers" />
			<BrowseLink text="Everything" search="" />
    </div>
	);
};