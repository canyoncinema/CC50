import React from 'react';
import './ShadowOnHover.css';

const ShadowOnHover = ({children}) =>
	React.cloneElement(children, {
		onMouseEnter: (e) => e.target.classList.add('ShadowOnHover'),
		onMouseLeave: (e) => e.target.classList.remove('ShadowOnHover')
	});

export default ShadowOnHover;