import React, { Component } from 'react';
import CollectionContext from '../../collection-context';
import './ViewModeButton.css';

import ViewModeList from './ViewModeList.png';
import ViewModeTile from './ViewModeTile.png';
import ViewModeListActive from './ViewModeListActive.png';
import ViewModeTileActive from './ViewModeTileActive.png';

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
								[
									<img
										key={0}
										alt="View as List"
										className="default"
										src={ViewModeList} />,
									<img
										key={1}
										alt="View as List - Active"
										className="active"
										src={ViewModeListActive} />
								]
								: mode === 'tile' ?
								[
									<img
										key={0}
										alt="View as Tiles"
										className="default"
										src={ViewModeTile} />,
									<img
										key={1}
										alt="View as Tiles - Active"
										className="active"
										src={ViewModeTileActive} />
								]
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
