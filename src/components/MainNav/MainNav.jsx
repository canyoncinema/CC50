import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Collapse, NavbarToggler, Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import IconNewWindow from '../Icon/IconNewWindow';
import './MainNav.css';

import Logo from '../Logo/Logo';
import CollectionItemHeader from '../CollectionItemHeader/CollectionItemHeader';

const mapStateToProps = state => ({
	item: state.item.data,
	collectionItems: state.item.collectionItems
});


// class MainNav = ({location, collectionItems, item, includesCollapsedItemPageNav, isCollapsed}) => {
class MainNav extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.state = {
            isOpen: false,
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

	render() {
        const {location, collectionItems, item, includesCollapsedItemPageNav, isCollapsed} = this.props;
        const isTransparent = location.pathname === '/';
        var i;
        const isActive = pathname => {
            return (i = location.pathname.indexOf(pathname)) === 0 &&
                (!location.pathname[pathname.length] || location.pathname[pathname.length] === '?' || location.pathname[pathname.length] === '/');
        };
        const isHomePageMainNav = location.pathname === '/';
        return <div className={[
            'MainNav',
            isCollapsed ? 'collapsed' : null,
            this.state.isOpen ? 'isOpen' : null,
            includesCollapsedItemPageNav ? 'includes-collapsed-item-nav' : null,
            isHomePageMainNav ? 'is-home' : null,
        ].join(' ')}>
            <Navbar expand="md" style={{backgroundColor: isTransparent ? 'transparent' : '#231f20'}}>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar className="navbar">
                    <Nav className={["container-fluid", this.state.width <= 770 ? null : "d-flex"]}>
                        <NavItem className="p-2 logo-nav-item">
                            <NavLink className="logo" href="/">
                                <Logo/>
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
                            <a target="_blank" href="//canyoncinema.com">View complete catalog at canyoncinema.com<IconNewWindow/></a>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            {
                includesCollapsedItemPageNav && item ?
                    <CollectionItemHeader
                        isCollapsed={true}
                        {...item}
                        collectionItems={collectionItems}/>
                    : null
            }
        </div>
    }
};

export default withRouter(connect(mapStateToProps)(MainNav));
