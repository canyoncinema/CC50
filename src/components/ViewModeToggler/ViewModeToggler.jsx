import React from 'react';
import PropTypes from 'prop-types';
import './ViewModeToggler.css';

import ViewModeButtons from '../ViewModeButtons/ViewModeButtons';

const ViewModeToggler = ({ theme, onClick, activeMode }) => (
	<div className={['ViewModeToggler', theme].join(' ')}>
		<label>View:</label>
		<ViewModeButtons
			theme={theme}
			activeMode={activeMode}
			onClick={onClick}/>
	</div>
);

ViewModeToggler.propTypes = {
	onClick: PropTypes.func.isRequired,
	activeMode: PropTypes.string.isRequired
};

export default ViewModeToggler;
