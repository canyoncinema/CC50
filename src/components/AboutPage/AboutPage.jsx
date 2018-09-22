import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import './AboutPage.css';

import { getNews } from '../../actions/news-actions';

import SecondaryPage from '../SecondaryPage/SecondaryPage';
import ComingSoonMessage from '../ComingSoonMessage/ComingSoonMessage';
import PageHeader from '../PageHeader/PageHeader';
import GhostPostContent from '../GhostPostContent/GhostPostContent';

const validTabs = [{
	id: 'about',
	label: 'About'
}, {
	id: 'support',
	label: 'Support Us'
}];

const mapStateToProps = state => ({
  aboutPagePost: state.news.data && state.news.data[0]
});

const mapDispatchToProps = dispatch => ({
  getNews: (...args) => dispatch(getNews(...args))
});

class AboutPage extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			// show about page on invalid /about#hash value
			activeTab: validTabs.map(t => t.id).includes(props.activeTab) ? props.activeTab : 'about'
		};
	}

	componentDidMount() {
		// PAGE HACK: to allow staff to edit these pages via Ghost,
		// retrieve the one Ghost Post with the given page as ghost post tag
		const PAGE_GHOST_TAG = 'About';
		this.props.getNews({
			limit: 1,
			page: PAGE_GHOST_TAG
		});
	}

	toggle = tabId => this.state.activeTab !== tabId && this.setState({ activeTab: tabId })

	render() {
		const { aboutPagePost } = this.props;
		return (
			<SecondaryPage
				headline="About Canyon Cinema 50"
				className="AboutPage"
				renderBelowHeader={() =>
		      <Nav tabs>
		      	<NavItem>
		      		<NavLink
		      			to="/about"
		      			className={this.state.activeTab === 'about' ? 'active' : ''}
	              onClick={() => { this.toggle('about') }}
		      		>
		      			About
		      		</NavLink>
		      	</NavItem>
		      	<NavItem>
		      		<NavLink
		      			to="/support"
		      			className={this.state.activeTab === 'support' ? 'active' : ''}
	              onClick={() => { this.toggle('support') }}
		      		>
		      			Support Us
		      		</NavLink>
		      	</NavItem>
		      </Nav>
				}>
				<Helmet>
	        <title>About | Canyon Cinema</title>
	      </Helmet>
	      <TabContent activeTab={this.state.activeTab}>
		      <TabPane tabId="about">
		      	{
		      		aboutPagePost &&
		      		<GhostPostContent className="container" html={aboutPagePost.html}>
		      		</GhostPostContent>
		      	}
		      </TabPane>
	      </TabContent>
			</SecondaryPage>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
