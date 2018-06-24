import React, { Component } from 'react';
import './RelatedLinks.css';

class RelatedLinks extends Component {
	render() {
		const { label, children } = this.props;
		return (
			<div className="RelatedLinks">
				{
					label ?
					<label>{label}:</label>
					: null
				} {children}
			</div>
		);
	}
}

export default RelatedLinks;
