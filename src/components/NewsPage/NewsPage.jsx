import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import './NewsPage.css';

import {appendGhostContent, getGhostContent} from '../../actions/ghost-actions';

import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import PageHeader from '../PageHeader/PageHeader';
import NewsTile from '../NewsTile/NewsTile';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import throttle from "../../utils/throttle";
import InfiniteScroll from "react-infinite-scroller";

const mapStateToProps = state => ({
  news: state.ghostContent.news,
  newsPageNum: state.ghostContent.pageNum || 1,
  finalPage: state.ghostContent.totalPages,
  isLoading: state.ghostContent.isLoading,
  error: state.ghostContent.error
});

const mapDispatchToProps = dispatch => ({
    getGhostContent: (...args) => dispatch(getGhostContent(...args)),
    appendGhostContent: (...args) => dispatch(appendGhostContent(...args))
});


class NewsPage extends Component {
    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
        this.isLoadingMore = false;
    }

    paginate = () => {
        const { newsPageNum } = this.props;
        const page = newsPageNum + 1;
        return this.props.appendGhostContent({
            limit: 3,
            type: 'news',
            page: page
        });
    }

    loadMore() {
        if (!this.paginate) return;
        if (this.isLoadingMore) {
            return;
        }
        this.isLoadingMore = true;
        this.paginate().then(() => {
            this.isLoadingMore = false;
        });
    }

    throttledLoadMore = throttle(this.loadMore.bind(this), 1000)

    componentDidUpdate(prevProps) {
        // TODO: bidirectional scroll
        if (prevProps.newsPageNum !== this.props.newsPageNum) {
            this.isLoadingMore = false;
        }
    }
	componentDidMount() {
        // TODO: there are currently < 50 news items so the scroll stops at 1 page and gets everything.
            // But in the future if limiting the number or grabbing multiple pages, there is no guaruntee that the
            // FEATURED NEWS item will be in the first page of results. So we need to MAKE 2 SEPARATE CALLS
            // for FEATURED and REGULAR (scrollable) news.
		this.props.getGhostContent({
			limit: 50,
			type: 'news',
			page: 1
		});
	}

	render() {
		const { news, newsIsLoading, newsPageNum, finalPage, newsError } = this.props;
		const featuredNews = (news || []).filter(n => n.featured);
		const normalNews = (news || []).filter(n => !n.featured);
		console.log(newsPageNum, finalPage);
		return (
			<div className="NewsPage">
				<ScrollToTopOnMount />
				<PageHeader headline="News" />
				<div className="container content">
					{
						featuredNews.length &&
						<React.Fragment>
							<Row>
								<Col sm={12}>
									<h3>Featured News</h3>
								</Col>
							</Row>
							<Row>
						{
							featuredNews.map((d, i) =>
			            <Col sm={4} key={i}>
			              <NewsTile {...d} key={i} />
			            </Col>
			          	)
			          }
							</Row>
						</React.Fragment>
					}
					<Row>
						<Col sm={12}>
							<hr />
						</Col>
					</Row>
					<Row>
					{
						newsIsLoading &&
						<LoadingMessage />
					}
					{
						newsError &&
						<ErrorMessage />
					}
					{
						normalNews &&

						<InfiniteScroll
							pageStart={0}
							className="row SearchCards"
							loadMore={this.throttledLoadMore}
							hasMore={finalPage && newsPageNum < finalPage}
							useWindow={true}
							threshold={500}
							loader={<LoadingMessage className="paginate-loader" key={-1}/>}
						>

							{

                                normalNews.map((d, i) => {
									return (
                                        <Col sm={4} key={i}>
                                    		<NewsTile {...d} key={i} />
                                    	</Col>
									);
								})
							}
						</InfiniteScroll>
					}
	                </Row>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
