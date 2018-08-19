import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CollectionItemHeader.css';
import { Row, Col } from 'reactstrap';
import { toCollectionSearchLabel } from '../../collection-context';

import RefNameLink from '../RefNameLink/RefNameLink';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import FilmTags from '../FilmTags/FilmTags';
import ThumbnailCarousel from '../ThumbnailCarousel/ThumbnailCarousel';
import { getShortIdentifierFromRefName } from '../../utils/parse-data';

const mapStateToProps = (state, ownProps) => ({
	item: state.item.data,
	itemMedia: state.itemsMedia.dataByShortIdentifier.get(ownProps.shortIdentifier),
	isLoading: state.item.isLoading,
	itemCreator: state.item.data &&
		state.item.data.creator
})

class CollectionItemHeader extends Component {

	render() {
		const {
			isCollapsed,
			collectionItems,
			item,
			itemMedia,
			itemCreator,
			isLoading
		} = this.props;
		if (isLoading) {
			return <LoadingMessage />;
		}
		const hasSideComponent = item.avatar || (itemMedia && itemMedia.length);
		return <header className={[
				'CollectionItemHeader',
				'container-fluid',
				collectionItems,
				'no-gutters',
				isCollapsed ? 'collapsed' : null
			].join(' ')}>
			<div className="container">
				<Row>
					<Col sm={hasSideComponent ? 6 : 12}>
						{
							!isCollapsed ?
							<label>
								{toCollectionSearchLabel(collectionItems)}
							</label>
							: null
						}
						<h1 className="white">{item.termDisplayName}</h1>
						<div className="metadata">
							{
								collectionItems === 'films' ?
								<div>
									{
										!isCollapsed &&
										item.creationYear ?
										<div className="year">{item.creationYear}</div>
										: null
									}
									{
										itemCreator ?
										<RefNameLink collection="filmmakers" refName={itemCreator} />
										: null
									}
									{
										!isCollapsed ?
										<FilmTags film={item} />
										: null
									}
								</div>
								: null
							}
						</div>
					</Col>
					{
						hasSideComponent ?
						<Col sm={6}>
							<div className="d-flex">
								<ThumbnailCarousel
									isCollapsed={isCollapsed}
									className="ml-auto" media={itemMedia} />
							</div>
						</Col>
						: null
					}
				</Row>
			</div>
		</header>
	}
}

export default connect(mapStateToProps)(CollectionItemHeader);
