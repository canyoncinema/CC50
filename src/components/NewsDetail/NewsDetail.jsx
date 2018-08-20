import React, { Component } from 'react';
import './NewsDetail.css';
import { connect } from 'react-redux';
import { getNewsDetail } from '../../actions/news-detail-actions';

import CalDayTitleHeader from '../CalDayTitleHeader/CalDayTitleHeader';
import RichText from '../RichText/RichText';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const mapStateToProps = state => ({
	newsDetail: state.newsDetail.data,
	isLoading: state.newsDetail.isLoading,
	error: state.newsDetail.error
});

const mapDispatchToProps = dispatch => ({
	getNewsDetail: (...args) => dispatch(getNewsDetail(...args))
})

class NewsDetail extends Component {
	componentDidMount() {
		this.props.getNewsDetail({ slug: this.props.slug });
	}

	setHtml() {
		return {__html: this.props.newsDetail && this.props.newsDetail.html };
	}

	render() {
		const { isLoading, error, newsDetail } = this.props;
		if (isLoading) return <LoadingMessage />;
		if (error) return <ErrorMessage />;
		const { slug, title, html, feature_image, status, authorName } = newsDetail;
		return (
			<div className="post-template NewsDetail post-full post">
				<CalDayTitleHeader
					startDateTime={new Date()}
					title="Test Title"
					creator={authorName}
				/>
				<div className="content post-full-content">
					{
						status !== 'published' ?
						<div className="container"><p>Sorry, this post is not published yet.</p></div>
						: <RichText dangerouslySetInnerHTML={this.setHtml()}></RichText>
					}
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);