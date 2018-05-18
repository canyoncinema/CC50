import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import './MainNav.css';

export default ({}) => {
	return (
		<div className="MainNav">
			<Navbar>
					<Nav className=" container-fluid d-flex full-nav">
						<NavItem className="p-2">
							<NavLink href="#">Logo Here</NavLink>
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
		</div>
	);
};