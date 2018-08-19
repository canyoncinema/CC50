import React from 'react';
import './withScrollNav.css';

function withScrollNav(Component, headerHeight=361) {
	// note: 361 is the height of a collapsed MainNav component
	return class extends Component {
		state = {
			isScrollNav: false
		}

		toggleCollapsedNavTimeout = null

		toggle = () => {
      if (window.scrollY >= headerHeight &&
      		!this.state.isScrollNav) {
      	this.setState({
      		isScrollNav: true
      	});
      } else if (window.scrollY < headerHeight &&
      		this.state.isScrollNav) {
      	this.setState({
      		isScrollNav: false
      	});
      }
		}

		toggleCollapsedNav = (e) => {
			this.toggle();
    }

		componentDidMount() {
	    this.toggleCollapsedNav = window.addEventListener('scroll', this.toggleCollapsedNav);
	  }

	  componentWillUnmount() {
			clearTimeout(this.toggleCollapsedNavTimeout);
	  	window.removeEventListener('scroll', this.toggleCollapsedNav);
	  }

	  render() {
	  	return <Component
	  		isScrollNav={this.state.isScrollNav}
	  		{...this.props}
	  	/>
	  }
	}
}

export default withScrollNav;
