import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RelatedLink.css';

class RelatedLink extends Component {
	render() {
		const {to, children, isLast} = this.props;
		return <Link to={to}>{children}{isLast ? '' : ', '}</Link>
	}
}

export default RelatedLink;