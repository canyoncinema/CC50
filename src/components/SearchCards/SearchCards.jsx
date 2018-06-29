import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import SearchCard from '../SearchCard/SearchCard';
import './SearchCards.css';

class SearchCards extends Component {
	render() {
		const { itemType, mediaByCsid, data, customColWidth, viewMode,
			onFilmmakerPage, isItemPageFilmCard } = this.props;
		let customColSize = this.props.customColSize;
		// SPEC: list view is ALWAYS 12-cols wide, no matter what
		if (viewMode === 'list') customColSize = 12;
		if (customColSize && customColWidth) {
			return data && data.length ?
			<Row className="SearchCards">
				{
					data.map((d, i) =>
						<div key={i} className={'col-'+
						(customColWidth === 'xs' ? '' : customColWidth + '-') +
						customColSize}>
							<SearchCard
								key={i}
								itemType={itemType}
								onFilmmakerPage={onFilmmakerPage}
								isItemPageFilmCard={isItemPageFilmCard}
								viewMode={viewMode}
								data={d}
								media={mediaByCsid && mediaByCsid.get(d.csid)}
								{...d} />
						</div>
					)
				}
			</Row>
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
								itemType={itemType}
								onFilmmakerPage={onFilmmakerPage}
								isItemPageFilmCard={isItemPageFilmCard}
								viewMode={viewMode}
								data={d}
								media={mediaByCsid && mediaByCsid.get(d.csid)}
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
						itemType={itemType}
						onFilmmakerPage={onFilmmakerPage}
						isItemPageFilmCard={isItemPageFilmCard}
						viewMode={viewMode}
						data={d}
						media={mediaByCsid && mediaByCsid.get(d.csid)}
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