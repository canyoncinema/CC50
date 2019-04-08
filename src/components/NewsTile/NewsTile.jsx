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
		const { title, tags, publishedAt, slug, featureImage, author, linkBase, type } = this.props;
		const authorByline = author ? ` by ${author}` : null;
		const link = linkBase ? linkBase : "/news";
		return (
			<Link to={`${link}/${slug}`}>
				<div className="NewsTile shadow-on-hover">
					<PhotoFill src={featureImage} backgroundColor="black" height="202px" />
					<div className="content">
						{ type === 'ephemera' ? <h6>EPHEMERA</h6> : null }
						<h4 className="hover-effect" ref={this.newsNameRef}>
							{title}
						</h4>
						{type !== 'ephemera' &&
							<div className="by-line">
							<DateTimeString dateTime={publishedAt} format="long-date" />
							{/*{authorByline}*/}
							</div>}
						{ tags && <Tags isReadOnly={true} tags={tags} /> }
						{/*<div className="read-more">*/}
							{/*Read More →*/}
						{/*</div>*/}
					</div>
				</div>
			</Link>
		);
	}
};

export default NewsTile;