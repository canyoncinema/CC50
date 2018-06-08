import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CollectionContext from '../../collection-context';
import './ViewModeButton.css';

import ViewModeList from './list-view-inactive.svg';
import ViewModeListActive from './list-view-active.svg';
import ViewModeGrid from './grid-view-inactive.svg';
import ViewModeGridActive from './grid-view-active.svg';

class ViewModeButton extends Component {
	render() {
		const { mode } = this.props;
		
		return (
			<CollectionContext.Consumer>
			{
				context => {
					const isActive = context.viewMode === mode;
					return (
						<div
							onClick={() => context.setViewMode(mode)}
							className={isActive ? 'ViewModeButton active' : 'ViewModeButton'}>
							{mode === 'list' ?
								<Link to="?view=list">
									<img
										key={0}
										alt="View as List"
										className="default"
										src={ViewModeList} />
									<img
										key={1}
										alt="View as List - Active"
										className="active"
										src={ViewModeListActive} />
								</Link>
								: mode === 'grid' ?
								<Link to="?view=grid">
									<img
										key={0}
										alt="View as Grid"
										className="default"
										src={ViewModeGrid} />
									<img
										key={1}
										alt="View as Grid - Active"
										className="active"
										src={ViewModeGridActive} />
								</Link>
								: null }
						</div>
					);
				}
			}
			</CollectionContext.Consumer>
		);
	}
}

export default ViewModeButton;
