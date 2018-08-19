import React, { Component } from 'react';

class NewsDetail extends Component {
	render() {
		const { slug } = this.props;
		return (
			<div className="NewsDetail">
				NewsDetail { slug }
			</div>
		);
	}
}

export default NewsDetail;