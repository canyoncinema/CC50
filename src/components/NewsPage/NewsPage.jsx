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
			limit: 40
		});
	}

	render() {
		const { news, newsIsLoading, newsError } = this.props;
		return (
			<div className="NewsPage">
				<ScrollToTopOnMount />
				<PageHeader headline="News" />
				<div className="container content">
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
						news && !newsIsLoading && !newsError &&
						news.map((d, i) =>
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
