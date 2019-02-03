import React, { Component } from 'react';
import './NewsDetail.css';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { optimalColWidths } from '../../utils/view-helpers';

import { getNewsDetail } from '../../actions/news-detail-actions';
import { getNews } from '../../actions/news-actions';

import GhostPostContent from '../GhostPostContent/GhostPostContent';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import Caret from '../Caret/Caret';
import NewsTile from '../NewsTile/NewsTile';
import CalDayTitleHeader from '../CalDayTitleHeader/CalDayTitleHeader';
import RichText from '../RichText/RichText';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const MAX_NUM_OLDER_ENTRIES = 3;

const mapStateToProps = state => ({
	newsDetail: state.newsDetail.data,
	isLoading: state.newsDetail.isLoading,
	error: state.newsDetail.error,
	// recycle the news state for listing other news section
	newsDetailOtherNews: state.news.data,
	newsDetailOtherNewsIsLoading: state.news.isLoading,
	newsDetailOtherNewsError: state.news.error
});

const mapDispatchToProps = dispatch => ({
	getNewsDetail: (...args) => dispatch(getNewsDetail(...args)),
	getNews: (...args) => dispatch(getNews(...args))
})

class NewsDetail extends Component {
	constructor(props) {
		super(props);
		this.initializedNews = false;
	}

	componentDidMount() {
		this.props.getNewsDetail({ slug: this.props.slug });
		this.initializedNews = false;
		this.getOlderEntries = this.getOlderEntries.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.newsDetail.published_at !==
			(this.props.newsDetail && this.props.newsDetail.published_at)
		) {
			this.initializedNews = true;
			this.getOlderEntries(this.props.newsDetail);
		}
	}

	setHtml() {
		return {__html: this.props.newsDetail && this.props.newsDetail.html };
	}

	getOlderEntries(lastNewsItem) {
		// get older than lastNewsItem publish date
		if (!lastNewsItem) return; // no more older entries
		this.props.getNews({
			limit: MAX_NUM_OLDER_ENTRIES,
			filter: `published_at%3A%3C'${lastNewsItem.published_at}'`,
		});
	}

	render() {
		const { isLoading, error, newsDetail,
		newsDetailOtherNews, newsDetailOtherNewsIsLoading, newsDetailOtherNewsError } = this.props;
		if (isLoading) return <LoadingMessage />;
		if (error) return <ErrorMessage />;
		const { slug, title, html, tags, eature_image, status, publishedAt, author } = newsDetail;
		return (
			<GhostPostContent key={1}
				className="NewsDetail"
				html={newsDetail.html}
				published={status === 'published'}
				renderTop={() => [
					<ScrollToTopOnMount key={0} />,
					<CalDayTitleHeader
						key={1}
						startDateTime={publishedAt}
						title={title}
						tags={tags}
					/>
				]}
				renderBottom={() => (
					<div className="container other-entries">
						<hr />
						<h3>Older Entries {
							newsDetailOtherNews && newsDetailOtherNews.length === MAX_NUM_OLDER_ENTRIES && 
							<span className="click-arrow" title="Get even older entries"
							onClick={() => this.getOlderEntries(newsDetailOtherNews[MAX_NUM_OLDER_ENTRIES - 1])}
							>></span>
						}</h3>
							{
								newsDetailOtherNewsIsLoading &&
								<LoadingMessage />
							}
							{
								newsDetailOtherNewsError &&
								<ErrorMessage />
							}
							{
		            newsDetailOtherNews &&
		            !newsDetailOtherNewsIsLoading &&
		            newsDetailOtherNews.length ?
		            <Row>
		              {
		              	newsDetailOtherNews.map((d, i) => {
	                    return (
	                      <Col sm={4} key={i}>
	                        <NewsTile {...d} key={i} />
	                      </Col>
	                    );
		                })
		              }
		            </Row>
		            : null
		          }
					</div>
				)}>
			</GhostPostContent>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);