import React from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import './MainNav.css';

import Logo from '../Logo/Logo';

const MainNav = ({location, isCollapsed}) => {
	const isTransparent = location.pathname === '/';
	var i;
	const isActive = pathname => {
		return (i = location.pathname.indexOf(pathname)) === 0 &&
		(!location.pathname[pathname.length] || location.pathname[pathname.length] === '?' || location.pathname[pathname.length] === '/');
	};
	const isHomePageMainNav = location.pathname === '/';
	return (
		<div className={[
			'MainNav',
			isCollapsed ? 'collapsed' : null,
			isHomePageMainNav ? 'is-home' : null,
		].join(' ')}>
			<Navbar
				style={{ backgroundColor: isTransparent ? 'transparent' : '#231f20' }}>
					<Nav className=" container-fluid d-flex full-nav">
						<NavItem className="p-2 logo-nav-item">
							<NavLink className="logo" href="/">
								<Logo />
							</NavLink>
						</NavItem>
						<NavItem className={isActive('/collection') ? 'p-2 active' : 'p-2'}>
							<NavLink href="/collection">Collection</NavLink>
						</NavItem>
						<NavItem className={isActive('/about') ? 'p-2 active' : 'p-2'}>
							<NavLink href="/about">About CC50</NavLink>
						</NavItem>
						<NavItem className={isActive('/tour') ? 'p-2 active' : 'p-2'}>
							<NavLink href="/tour">Tour</NavLink>
						</NavItem>
						<NavItem className={isActive('/events') ? 'p-2 active' : 'p-2'}>
							<NavLink href="/events">Events</NavLink>
						</NavItem>
						<NavItem className={isActive('/news') ? 'p-2 active' : 'p-2'}>
							<NavLink href="/news">News</NavLink>
						</NavItem>
						<NavItem className="ml-auto p-2">
							<NavLink href="#">canyoncinema.com</NavLink>
						</NavItem>
					</Nav>
			</Navbar>
		</div>
	);
};

export default withRouter(MainNav);