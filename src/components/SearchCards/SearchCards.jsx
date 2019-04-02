import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import SearchCard from '../SearchCard/SearchCard';
import { getShortIdentifierFromRefName } from '../../utils/parse-data';
import throttle from '../../utils/throttle';
import './SearchCards.css';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingMessage from '../LoadingMessage/LoadingMessage';

class SearchCards extends Component {
	// expects first page of data loaded in

	// TODO: bidirectional infinite scroll. 1-direction only for now.
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

	throttledLoadMore = throttle(this.loadMore.bind(this), 1000)

	componentDidUpdate(prevProps) {
		// TODO: bidirectional scroll
		if (prevProps.data.length !== this.props.data.length) {
			this.isLoadingMore = false;
		}
	}
	render() {
		const {
			id,
			itemType, mediaIsByRtSbj,
			data, totalCount, pageCount,
			customColWidth, viewMode,
			onFilmmakerPage, isItemPageFilmCard } = this.props;
		let customColSize = this.props.customColSize;
		// SPEC: list view is ALWAYS 12-cols wide, no matter what
		if (viewMode === 'list') customColSize = 12;
		if (customColSize && customColWidth) {
			return data && data.length ?
			<InfiniteScroll
				pageStart={0}
				className="row SearchCards"
				loadMore={this.throttledLoadMore}
				hasMore={
					this.props.paginate &&
					totalCount &&
					data.length <= totalCount
				}
				useWindow={true}
				threshold={500}
				loader={<LoadingMessage className="paginate-loader" key={-1} />}
			>
				{
					data.map((d, i) =>
						<div key={i} className={'col-'+
						(customColWidth === 'xs' ? '' : customColWidth + '-') +
						customColSize}>
							<SearchCard
                                mediaIsByRtSbj={mediaIsByRtSbj}
								key={d.csid}
								itemType={itemType || d.itemType}
								onFilmmakerPage={onFilmmakerPage}
								isItemPageFilmCard={isItemPageFilmCard}
								viewMode={viewMode}
								data={d}
								{...d} />
						</div>
					)
				}
			</InfiniteScroll>
			: null;
		}

		if (customColSize) {
			return data && data.length ?
			<Row className="SearchCards">
				{
					data.map((d, i) =>
						<Col key={i} xl={customColSize}>
							<SearchCard
								key={i}
                                mediaIsByRtSbj={mediaIsByRtSbj}
                                itemType={itemType}
								onFilmmakerPage={onFilmmakerPage}
								isItemPageFilmCard={isItemPageFilmCard}
								viewMode={viewMode}
								data={d}
								{...d} />
						</Col>
					)
				}
			</Row>
			: null;
		}
		return data && data.length ?
			<div className="SearchCards">
			{
				data.map((d, i) =>
					<SearchCard
						key={i}
                        mediaIsByRtSbj={mediaIsByRtSbj}
                        itemType={itemType}
						onFilmmakerPage={onFilmmakerPage}
						isItemPageFilmCard={isItemPageFilmCard}
						viewMode={viewMode}
						data={d}
						{...d} />
				)
			}
			</div>
			: null;
	}
}

SearchCards.propTypes = {
	data: PropTypes.array.isRequired
}

export default SearchCards;