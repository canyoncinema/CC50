import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import IconNewWindow from '../Icon/IconNewWindow';
import './MainNav.css';

import Logo from '../Logo/Logo';
import CollectionItemHeader from '../CollectionItemHeader/CollectionItemHeader';

const mapStateToProps = state => ({
	item: state.item.data,
	collectionItems: state.item.collectionItems
});

const MainNav = ({location, collectionItems, item, includesCollapsedItemPageNav, isCollapsed}) => {
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
			includesCollapsedItemPageNav ? 'includes-collapsed-item-nav' : null,
			isHomePageMainNav ? 'is-home' : null,
		].join(' ')}>
			<Navbar
				style={{ backgroundColor: 'pink' }}>
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
							<NavLink href="/about">About</NavLink>
						</NavItem>
						<NavItem className={isActive('/events') ? 'p-2 active' : 'p-2'}>
							<NavLink href="/events">Events</NavLink>
						</NavItem>
						<NavItem className={isActive('/news') ? 'p-2 active' : 'p-2'}>
							<NavLink href="/news">News</NavLink>
						</NavItem>
						<NavItem className={isActive('/support') ? 'p-2 active' : 'p-2'}>
							<NavLink href="/support">Support Us</NavLink>
						</NavItem>
						<NavItem className="ml-auto p-2">
							<a target="_blank" href="//canyoncinema.com">canyoncinema.com <IconNewWindow /></a>
						</NavItem>
					</Nav>
			</Navbar>
			{
				includesCollapsedItemPageNav && item ?
				<CollectionItemHeader
					isCollapsed={true}
					{...item}
					collectionItems={collectionItems} />
				: null
			}
		</div>
	);
};

export default withRouter(connect(mapStateToProps)(MainNav));
