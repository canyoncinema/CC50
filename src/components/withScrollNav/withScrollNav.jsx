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
			// console.log('headerHeight', headerHeight);
      if (window.scrollY >= headerHeight &&
      		!this.state.isScrollNav) {
      	console.log('set isScrollNav');
      	this.setState({
      		isScrollNav: true
      	});
      } else if (window.scrollY < headerHeight &&
      		this.state.isScrollNav) {
      	console.log('set !isScrollNav');
      	this.setState({
      		isScrollNav: false
      	});
      }
		}

		toggleCollapsedNav = (e) => {
			// if (this.toggleCollapsedNavTimeout) {
			// 	clearTimeout(this.toggleCollapsedNavTimeout);
			// 	this.toggleCollapsedNavTimeout = null;
			// }
			// this.toggleCollapsedNavTimeout = setTimeout(() => this.toggle, 0);
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
