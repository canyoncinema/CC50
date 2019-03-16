import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $clamp from 'clamp-js';
import './NewsTile.css';
import ReactMarkdown from 'react-markdown';

import PhotoFill from '../PhotoFill/PhotoFill';
import DateTimeString from '../DateTimeString/DateTimeString';
import Tags from '../Tags/Tags';

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
		const { title, tags, publishedAt, slug, featureImage, author } = this.props;
		const authorByline = author ? ` by ${author}` : null;
		return (
			<Link to={`/news/${slug}`}>
				<div className="NewsTile shadow-on-hover">
					<PhotoFill src={featureImage} backgroundSize="cover" height="202px" />
					<div className="content">
						<h4 className="hover-effect" ref={this.newsNameRef}>
							{title}
						</h4>
						<div className="by-line">
							<DateTimeString dateTime={publishedAt} format="long-date" />
							{authorByline}
						</div>
						{ tags && <Tags isReadOnly={true} tags={tags} /> }
						<div className="read-more">
							Read More →
						</div>
					</div>
				</div>
			</Link>
		);
	}
};

export default NewsTile;