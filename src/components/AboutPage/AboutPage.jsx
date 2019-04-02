import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import './AboutPage.css';

import {
	RECEIVED_GHOST_PAGE_ABOUT,
	RECEIVED_GHOST_PAGE_SUPPORT_US,
	RECEIVED_GHOST_PAGE_PRESS,
	RECEIVED_GHOST_PAGE_TOUR
} from '../../actionTypes';
import { getGhostContent } from '../../actions/ghost-actions';
import {
	ABOUT_PAGE_TAG,
	SUPPORT_US_PAGE_TAG,
	TOUR_PAGE_TAG,
	PRESS_PAGE_TAG
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
},{
    id: 'tour',
    label: 'Tour'
},{
    id: 'press',
    label: 'Press'
}];

const mapStateToProps = state => ({
  aboutPageNews: state.ghostContent.aboutPage,
  supportUsPageNews: state.ghostContent.supportUsPage,
  tourPageNews: state.ghostContent.tourPage,
  pressPageNews: state.ghostContent.pressPage,
});

const mapDispatchToProps = dispatch => ({
  getGhostContent: (...args) => dispatch(getGhostContent(...args))
});

const tabLookup = {
	about: {
        pageghostTag: ABOUT_PAGE_TAG,
		headline: 'About Canyon Cinema 50',
		title: 'About | Canyon Cinema',
		newsPageActionType: RECEIVED_GHOST_PAGE_ABOUT
	},
	support: {
        pageghostTag: SUPPORT_US_PAGE_TAG,
        headline: 'Support Us',
        title: 'Support Us | Canyon Cinema',
        newsPageActionType: RECEIVED_GHOST_PAGE_SUPPORT_US
	},
	tour: {
        pageghostTag: TOUR_PAGE_TAG,
        headline: 'Tour',
        title: 'Tour | Canyon Cinema',
        newsPageActionType: RECEIVED_GHOST_PAGE_TOUR
	},
	press: {
        pageghostTag: PRESS_PAGE_TAG,
        headline: 'Press',
        title: 'Press | Canyon Cinema',
        newsPageActionType: RECEIVED_GHOST_PAGE_PRESS
	}
}

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
		console.log(this.state.activeTab);
		this.props.getGhostContent({
			limit: 1,
			page: tabLookup[this.state.activeTab].pageghostTag
		}, tabLookup[this.state.activeTab].newsPageActionType);
	}

	toggle = tabId => this.state.activeTab !== tabId && this.setState({ activeTab: tabId })

	render() {
		const { aboutPageNews, supportUsPageNews, tourPageNews, pressPageNews } = this.props;
		const { activeTab } = this.state;
		return (
			<SecondaryPage
				headline={tabLookup[activeTab].headline}
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
				  <NavItem>
					  <NavLink
						  to="/tour"
						  className={activeTab === 'tour' ? 'active' : ''}
						  onClick={() => { this.toggle('tour') }}
					  >
						  Tour
					  </NavLink>
				  </NavItem>
				  <NavItem>
					  <NavLink
						  to="/press"
						  className={activeTab === 'press' ? 'active' : ''}
						  onClick={() => { this.toggle('press') }}
					  >
						  Press
					  </NavLink>
				  </NavItem>
		      </Nav>
				}>
				<Helmet>
	        <title>{tabLookup[activeTab].title}</title>
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
              <TabPane tabId="tour">
                  {
					  // {/*<p>Need to add Tour to Ghost.</p>*/}
                      tourPageNews &&
                      <GhostPostContent className="container" html={tourPageNews.html}>
                      </GhostPostContent>
                  }
              </TabPane>
              <TabPane tabId="press">
                  {
                      // <p>Need to add Press to Ghost.</p>
                      pressPageNews &&
                      <GhostPostContent className="container" html={pressPageNews.html}>
                      </GhostPostContent>
                  }
              </TabPane>
		      
	      </TabContent>
		</SecondaryPage>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
