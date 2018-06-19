import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import SearchCard from '../SearchCard/SearchCard';
import './SearchCards.css';

class SearchCards extends Component {
	render() {
		const { itemType, data, customColSize, customColWidth, viewMode, isItemPage } = this.props;
		if (customColSize && customColWidth) {
			return data && data.length ?
			<Row className="SearchCards">
				{
					data.map((d, i) =>
						<div key={i} className={'col-'+customColWidth+'-'+customColSize}>
							<SearchCard
								key={i}
								itemType={itemType}
								isItemPage={isItemPage}
								viewMode={viewMode}
								data={d}
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
								isItemPage={isItemPage}
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
						itemType={itemType}
						isItemPage={isItemPage}
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