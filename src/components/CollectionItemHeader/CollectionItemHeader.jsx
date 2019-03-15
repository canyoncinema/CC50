import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CollectionItemHeader.css';
import { Row, Col } from 'reactstrap';
import { toCollectionSearchLabel } from '../../collection-context';

import RefNameLink from '../RefNameLink/RefNameLink';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import FilmTags from '../FilmTags/FilmTags';
import ThumbnailCarousel from '../ThumbnailCarousel/ThumbnailCarousel';
import { getShortIdentifierFromRefName, getDisplayNameFromRefName } from '../../utils/parse-data';

const mapStateToProps = (state, ownProps) => ({
	item: state.item.data,
	itemMedia: state.itemsMedia.dataByShortIdentifier.get(ownProps.shortIdentifier),
	itemMediaByRtSbj: state.itemsMedia.dataByRtSbj.get(ownProps.rtSbj),
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
			itemMediaByRtSbj,
			itemCreator,
			isLoading
		} = this.props;
		if (isLoading) {
			return <LoadingMessage />;
		}
		const thisMedia = itemMediaByRtSbj ? itemMediaByRtSbj : itemMedia;
        const hasSideComponent = item.avatar || (thisMedia && thisMedia.length);
        
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
                            {
                                collectionItems === 'programs' ?
                                    <div>
                                        {
                                            !isCollapsed &&
                                            item.totalDuration ?
                                                <div className="total-duration">{item.totalDuration}</div>
                                                : null
                                        }
                                        {
                                            item.curators && item.curators.curator ?
                                                <div className="curator">
                                                    Curated by {getDisplayNameFromRefName(item.curators.curator)}
                                                    </div>
                                                // TODO: make curators relational / linkable?
                                                //<RefNameLink collection="curators" refName={item.curator} />
                                                : null
                                        }
                                        {
                                            // TODO: add format - is it film format or is there a "program" format? 16mm e.g.
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
									className="ml-auto" media={thisMedia} />
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
