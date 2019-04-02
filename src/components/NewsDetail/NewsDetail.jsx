import React, { Component } from 'react';
import './NewsDetail.css';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { optimalColWidths } from '../../utils/view-helpers';

import { getNewsDetail } from '../../actions/ghost-detail-actions';
import { getGhostContent } from '../../actions/ghost-actions';

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
	// recycle the ghostContent state for listing other ghostContent section
	newsDetailOtherNews: state.ghostContent.news,
	newsDetailOtherNewsIsLoading: state.ghostContent.isLoading,
	newsDetailOtherNewsError: state.ghostContent.error
});

const mapDispatchToProps = dispatch => ({
	getNewsDetail: (...args) => dispatch(getNewsDetail(...args)),
	getGhostContent: (...args) => dispatch(getGhostContent(...args))
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
		this.props.getGhostContent({
			limit: MAX_NUM_OLDER_ENTRIES,
			filter: `published_at%3A%3C'${lastNewsItem.published_at}'`,
			type: 'news',
			page: 0
		});
	}

	render() {
		const { isLoading, error, newsDetail,
		newsDetailOtherNews, newsDetailOtherNewsIsLoading, newsDetailOtherNewsError, type } = this.props;
		if (isLoading) return <LoadingMessage />;
		if (error) return <ErrorMessage />;
		const { title, tags, status, publishedAt } = newsDetail;
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
						type={type}
					/>
				]}

				renderBottom={() => (
                    type !== 'ephemera' &&
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