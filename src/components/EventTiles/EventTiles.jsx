import React from 'react';
import { Col } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroller';
import './EventTiles.css';
import throttle from '../../utils/throttle';

import LoadingMessage from '../LoadingMessage/LoadingMessage';
import EventTile from '../EventTile/EventTile';

class EventTiles extends React.Component {
    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
        this.isLoadingMore = false;
    }

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

	throttledLoadMore = throttle(this.loadMore.bind(this), 1000);

    componentDidUpdate(prevProps) {
        // TODO: bidirectional scroll
        if (prevProps.data.length !== this.props.data.length) {
            this.isLoadingMore = false;
        }
    }

	render() {
		const { className, customColSize, totalCount, data, noPagination} = this.props;
		return data && data.length ?
            !noPagination ?
				<InfiniteScroll
					pageStart={0}
					className={['row EventTiles', className].join(' ')}
					loadMore={this.throttledLoadMore}
					hasMore={
						this.props.paginate &&
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
				:
				data.map((d, i) => {
					return (
						<Col key={i} md={customColSize || 4}>
							<EventTile {...d} key={i} />
						</Col>
					);
				})
		: null
	}
}

export default EventTiles;
