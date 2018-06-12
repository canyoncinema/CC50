import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ViewModeButton from '../ViewModeButton/ViewModeButton';

class ViewModeButtons extends Component {
	defaultMode = 'grid'

	modes = ['grid', 'list']

	render() {
		const { theme, onClick, activeMode } = this.props;
		return (
			this.modes.map((mode, i) => (
				<ViewModeButton
					theme={theme}
					isActive={activeMode === mode}
					key={i}
					mode={mode}
					onClick={() => onClick(mode)} />
			))
		);
	}
}

ViewModeButtons.propTypes = {
	onClick: PropTypes.func.isRequired,
	theme: PropTypes.string,
	activeMode: PropTypes.string.isRequired
};

export default ViewModeButtons;
