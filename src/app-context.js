import React from 'react';

const AppContext = React.createContext({
	isHome: true,
	isCollapsedNav: false
});

export default AppContext;