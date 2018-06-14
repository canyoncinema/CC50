import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ViewModeButton.css';

import ViewModeList from './list-view-inactive.svg';
import ViewModeListActive from './list-view-active.svg';
import ViewModeListGoldActive from './list-view-active-gold.svg';
import ViewModeGrid from './grid-view-inactive.svg';
import ViewModeGridActive from './grid-view-active.svg';
import ViewModeGridGoldActive from './grid-view-active-gold.svg';

class ViewModeButton extends Component {
	render() {
		const { theme, mode, onClick, isActive } = this.props;
		return (
			<div
				onClick={onClick}
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
							src={theme === 'dark' ? ViewModeListGoldActive : ViewModeListActive} />
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
							src={theme === 'dark' ? ViewModeGridGoldActive : ViewModeGridActive} />
					</Link>
					: null }
			</div>
		);
	}
}

export default ViewModeButton;
