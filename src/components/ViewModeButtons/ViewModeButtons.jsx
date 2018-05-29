import React, { Component } from 'react';
import ViewModeButton from '../ViewModeButton/ViewModeButton';

class ViewModeButtons extends Component {
	defaultMode = 'tile'

	modes = ['tile', 'list']

	render() {
		return (
			this.modes.map((mode, i) => (
				<ViewModeButton key={i} mode={mode} />
			))
		);
	}
}

export default ViewModeButtons;
