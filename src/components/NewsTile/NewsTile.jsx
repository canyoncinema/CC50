import React, { Component } from 'react';
import $clamp from 'clamp-js';
import './NewsTile.css';
import ReactMarkdown from 'react-markdown';

import PhotoFill from '../PhotoFill/PhotoFill';
import DateTimeString from '../DateTimeString/DateTimeString';

class NewsTile extends Component {
	constructor(props) {
		super(props)
		this.newsNameRef = React.createRef();
	}

	componentDidMount() {
		const name = this.newsNameRef.current;
		$clamp(name, { clamp: 3 });
	}

	render() {
		const { name, created, photo, author } = this.props;
		const authorByline = author ? ` by ${author}` : null;
		return (
			<div className="NewsTile shadow-on-hover">
				<PhotoFill src={photo} height="202px" />
				<div className="content">
					<h4 className="hover-effect" ref={this.newsNameRef}>
						<ReactMarkdown source={name} />
					</h4>
					<div>
						<DateTimeString dateTime={created} format="long-date" />
						{authorByline}
					</div>
					<div className="read-more">
						Read More →
					</div>
				</div>
			</div>
		);
	}
};

export default NewsTile;