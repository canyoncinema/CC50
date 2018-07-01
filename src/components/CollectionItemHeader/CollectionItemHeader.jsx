import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CollectionItemHeader.css';
import { Row, Col } from 'reactstrap';
import { toCollectionSearchLabel } from '../../collection-context';

import CreatorLink from '../CreatorLink/CreatorLink';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import FilmTags from '../FilmTags/FilmTags';
import ThumbnailCarousel from '../ThumbnailCarousel/ThumbnailCarousel';
import { getShortIdentifierFromRefName } from '../../utils/parse-data';

const mapStateToProps = (state, ownProps) => ({
	item: state.item.data,
	itemMedia: state.itemsMedia.dataByShortIdentifier.get(ownProps.shortIdentifier),
	isLoading: state.item.isLoading,
	itemCreator: state.item.data &&
		state.item.data.creatorGroupList &&
		state.item.data.creatorGroupList.creatorGroup &&
		state.item.data.creatorGroupList.creatorGroup.creator
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
										<CreatorLink creatorRefName={itemCreator} />
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
								<ThumbnailCarousel className="ml-auto" media={itemMedia} />
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
