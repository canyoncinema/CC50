import React, { Component } from 'react';
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
		const { mode, isActive, onChangeMode } = this.props;
		
		return (
			<div
				className={isActive ? 'ViewModeButton active' : 'ViewModeButton'}
				onClick={() => onChangeMode(mode)}>
				{mode === 'list' ?
					[
						<img className="default" src={ViewModeList} />,
						<img className="active" src={ViewModeListActive} />
					]
					: mode === 'tile' ?
					[
						<img className="default" src={ViewModeTile} />,
						<img className="active" src={ViewModeTileActive} />
					]
					: null }
			</div>
		);
	}
}

export default ViewModeButton;
