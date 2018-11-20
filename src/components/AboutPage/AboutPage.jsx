import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import './AboutPage.css';

import {
	RECEIVED_NEWS_PAGE_ABOUT,
	RECEIVED_NEWS_PAGE_SUPPORT_US
} from '../../actionTypes';
import { getNews } from '../../actions/news-actions';
import {
	ABOUT_PAGE_TAG,
	SUPPORT_US_PAGE_TAG
} from '../../config';

import SecondaryPage from '../SecondaryPage/SecondaryPage';
import ComingSoonMessage from '../ComingSoonMessage/ComingSoonMessage';
import PageHeader from '../PageHeader/PageHeader';
import GhostPostContent from '../GhostPostContent/GhostPostContent';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';

const validTabs = [{
	id: 'about',
	label: 'About'
}, {
	id: 'support',
	label: 'Support Us'
}];

const mapStateToProps = state => ({
  aboutPageNews: state.news.aboutPage,
  supportUsPageNews: state.news.supportUsPage,
});

const mapDispatchToProps = dispatch => ({
  getNews: (...args) => dispatch(getNews(...args))
});

const pageghostTag = activeTab => activeTab === 'about' ? ABOUT_PAGE_TAG : SUPPORT_US_PAGE_TAG;
const headline = activeTab => activeTab === 'about' ? 'About Canyon Cinema 50' : 'Support Us';
const title = activeTab => activeTab === 'about' ? 'About | Canyon Cinema' : 'Support Us | Canyon Cinema';
const newsPageActionType = activeTab => activeTab === 'about' ? RECEIVED_NEWS_PAGE_ABOUT : RECEIVED_NEWS_PAGE_SUPPORT_US;

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
		this.props.getNews({
			limit: 1,
			page: pageghostTag(this.state.activeTab)
		}, newsPageActionType(this.state.activeTab));
	}

	toggle = tabId => this.state.activeTab !== tabId && this.setState({ activeTab: tabId })

	render() {
		const { aboutPageNews, supportUsPageNews } = this.props;
		const { activeTab } = this.state;
		return (
			<SecondaryPage
				headline={headline(activeTab)}
				className="AboutPage"
				renderBelowHeader={() =>
		      <Nav tabs>
		      	<NavItem>
		      		<NavLink
		      			to="/about"
		      			className={activeTab === 'about' ? 'active' : ''}
	              onClick={() => { this.toggle('about') }}
		      		>
		      			About
		      		</NavLink>
		      	</NavItem>
		      	<NavItem>
		      		<NavLink
		      			to="/support"
		      			className={activeTab === 'support' ? 'active' : ''}
	              onClick={() => { this.toggle('support') }}
		      		>
		      			Support Us
		      		</NavLink>
		      	</NavItem>
		      </Nav>
				}>
				<Helmet>
	        <title>{title(activeTab)}</title>
	      </Helmet>
	      <ScrollToTopOnMount />
	      <TabContent activeTab={activeTab}>
		      <TabPane tabId="about">
		      	{
		      		aboutPageNews &&
		      		<GhostPostContent className="container" html={aboutPageNews.html}>
		      		</GhostPostContent>
		      	}
		      </TabPane>
		      <TabPane tabId="support">
		      	{
		      		supportUsPageNews &&
		      		<GhostPostContent className="container" html={supportUsPageNews.html}>
		      		</GhostPostContent>
		      	}
		      </TabPane>
		      
	      </TabContent>
			</SecondaryPage>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
