import React, { Component } from 'react';

import ViewModeButton from '../ViewModeButton/ViewModeButton';

class ViewModeButtons extends Component {
	defaultMode = 'tile'

	modes = ['tile', 'list']

	state = {
		activeMode: this.defaultMode
	}

	onChangeMode(mode) {
		this.setState({
			activeMode: mode
		});
	}

	render() {
		return (
			this.modes.map((mode, i) => (
				<ViewModeButton key={i}
					mode={mode}
					isActive={mode === this.state.activeMode}
					onChangeMode={this.onChangeMode.bind(this)} />
			))
		);
	}
}

export default ViewModeButtons;
