import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import './NewsPage.css';

import { getNews } from '../../actions/news-actions';

import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import PageHeader from '../PageHeader/PageHeader';
import NewsTile from '../NewsTile/NewsTile';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const mapStateToProps = state => ({
  news: state.news.data,
  newsIsLoading: state.news.isLoading,
  newsError: state.news.error
});

const mapDispatchToProps = dispatch => ({
  getNews: (...args) => dispatch(getNews(...args))
});


class NewsPage extends Component {
	componentDidMount() {
		this.props.getNews({
			limit: 50
		});
	}

	render() {
		const { news, newsIsLoading, newsError } = this.props;
		const featuredNews = (news || []).filter(n => n.featured);
		const normalNews = (news || []).filter(n => !n.featured);
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
						normalNews && !newsIsLoading && !newsError &&
						normalNews.map((d, i) =>
	            <Col sm={4} key={i}>
	              <NewsTile {...d} key={i} />
	            </Col>
	          )
	        }
	        </Row>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
