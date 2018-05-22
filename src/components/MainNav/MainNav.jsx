import React from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import './MainNav.css';

import MainNavFilterBar from '../MainNavFilterBar/MainNavFilterBar';

export default ({collapsed, backgroundColor}) => {
	return (
		<div className={collapsed ? 'MainNav collapsed' : 'MainNav'}>
			<Navbar
				style={{ backgroundColor: backgroundColor }}>
					<Nav className=" container-fluid d-flex full-nav">
						<NavItem className="p-2">
							<NavLink className="logo" href="/">
								<img src="/images/logo.png" />
							</NavLink>
						</NavItem>
						<NavItem className="p-2">
							<NavLink href="#">Collection</NavLink>
						</NavItem>
						<NavItem className="p-2">
							<NavLink href="#">About CC50</NavLink>
						</NavItem>
						<NavItem className="p-2">
							<NavLink href="#">Tour</NavLink>
						</NavItem>
						<NavItem className="p-2">
							<NavLink href="#">Events</NavLink>
						</NavItem>
						<NavItem className="p-2">
							<NavLink href="#">News</NavLink>
						</NavItem>
						<NavItem className="ml-auto p-2">
							<NavLink href="#">canyoncinema.com</NavLink>
						</NavItem>
					</Nav>
			</Navbar>
			{
				collapsed ?
			 	<MainNavFilterBar style={{ backgroundColor: backgroundColor }} />
			 	: null
			}
		</div>
	);
};