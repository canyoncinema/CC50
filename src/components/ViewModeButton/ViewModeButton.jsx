import React, { Component } from 'react';
import CollectionContext from '../../collection-context';
import './ViewModeButton.css';

import ViewModeList from './ViewModeList.png';
import ViewModeTile from './ViewModeTile.png';
import ViewModeListActive from './ViewModeListActive.png';
import ViewModeTileActive from './ViewModeTileActive.png';

function getImgSrc (mode, isActive) {
	switch (mode) {
		case 'list':
			return isActive ? ViewModeListActive : ViewModeList;
		case 'tile':
			return isActive ? ViewModeTileActive : ViewModeTile;
		default:
			throw new Error(`Unknown view mode ${mode}`);
	}
}

class ViewModeButton extends Component {
	render() {
		const { mode, onClick } = this.props;
		
		return (
			<CollectionContext.Consumer>
			{
				context => {
					const isActive = context.viewMode === mode;
					return (
						<div
							onClick={() => context.changeViewMode(mode)}
							className={isActive ? 'ViewModeButton active' : 'ViewModeButton'}>
							{mode === 'list' ?
								[
									<img key={0} className="default" src={ViewModeList} />,
									<img key={1} className="active" src={ViewModeListActive} />
								]
								: mode === 'tile' ?
								[
									<img key={0} className="default" src={ViewModeTile} />,
									<img key={1} className="active" src={ViewModeTileActive} />
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
