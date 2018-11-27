import React from 'react';
import { Row, Col } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroller';
import './EventTiles.css';
import throttle from '../../utils/throttle';

import LoadingMessage from '../LoadingMessage/LoadingMessage';
import EventTile from '../EventTile/EventTile';

class EventTiles extends React.Component {
	loadMore() {
		const { paginate } = this.props;
		if (!paginate) return;
		if (this.isLoadingMore) {
			return;
		}
		this.isLoadingMore = true;
		paginate().then(() => {
			this.isLoadingMore = false;
		});
	}

	throttledLoadMore = throttle(this.loadMore.bind(this), 1000)

	render() {
		const { className, customColSize, paginate, data, totalCount } = this.props;
		return (
			<InfiniteScroll
				pageStart={0}
				className={['row EventTiles', className].join(' ')}
				loadMore={this.throttledLoadMore}
				hasMore={
					paginate &&
					totalCount &&
					data.length <= totalCount
				}
				useWindow={true}
				threshold={500}
				loader={<LoadingMessage key={-1} />}
			>
				{
					data.map((d, i) => {
						return (
							<Col key={i} md={customColSize || 4}>
								<EventTile {...d} key={i} />
							</Col>
						);
					})
				}
			</InfiniteScroll>
		);
	}
}

export default EventTiles;
