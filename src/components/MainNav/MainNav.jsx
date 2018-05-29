import React from 'react';
import { withRouter } from 'react-router';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import './MainNav.css';
import CollectionContext from '../../collection-context';

const MainNav = ({isCollapsed, location}) => {
	const isTransparent = location.pathname === '/';
	const isCollapsible = location.pathname !== '/';
	const isActive = pathname => location.pathname.indexOf(pathname) === 0;
	return (
		<div className={isCollapsed ?
				'MainNav collapsed' : 'MainNav'}>
			<Navbar
				style={{ backgroundColor: isTransparent ? 'transparent' : '#231f20' }}>
					<Nav className=" container-fluid d-flex full-nav">
						<NavItem className="p-2 logo-nav-item">
							<NavLink className="logo" href="/">
								<img src="/images/logo.png" />
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