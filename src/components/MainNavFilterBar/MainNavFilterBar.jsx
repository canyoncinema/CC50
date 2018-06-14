import React from 'react';
import './MainNavFilterBar.css';

import CollectionContext from '../../collection-context';
import Search from '../Search/Search';
import ViewModeButtons from '../ViewModeButtons/ViewModeButtons';

const MainNavFilterBar = ({ collectionItems, style }) => {
	return (
		<CollectionContext.Consumer>
			{
				context =>
				<div className="MainNavFilterBar" style={style}>
					<Search id={1} collectionItems={collectionItems} />
					<div className="view-bar">
						View:
					</div>
					<ViewModeButtons
						activeMode={context.viewMode}
						onClick={context.setViewMode} />
				</div>
			}
		</CollectionContext.Consumer>
	);
};

export default MainNavFilterBar;