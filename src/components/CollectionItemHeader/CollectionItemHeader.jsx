import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CollectionItemHeader.css';

import { Row, Col } from 'reactstrap';
import { toCollectionSearchLabel } from '../../collection-context';

import CreatorLink from '../CreatorLink/CreatorLink';
import FilmTags from '../FilmTags/FilmTags';
import Tags from '../Tags/Tags';
import Tag from '../Tag/Tag';

const mapStateToProps = state => ({
	item: state.item.data,
	itemCreator: state.item.data &&
		state.item.data.creatorGroupList &&
		state.item.data.creatorGroupList.creatorGroup &&
		state.item.data.creatorGroupList.creatorGroup.creator
})

class CollectionItemHeader extends Component {

	render() {
		const {
			collapsed,
			collectionItems,
			item,
			itemCreator,
			title,
			displayName,
			// films & programs
			media,
			format,
			// films
			created,
			image,
			sound,
			years,
			// filmmakers
			avatar,
			// ephemera
			types
		} = this.props;
		console.log('itemCreator', itemCreator);
		const hasSideComponent = avatar || (media && media.length);
		return <header className={`CollectionItemHeader container-fluid ${collectionItems} no-gutters`}>
			<div className="container">
				<Row>
					<Col sm={hasSideComponent ? 6 : 12}>
						<label>{toCollectionSearchLabel(collectionItems)}</label>
						<h1 className="white">{item.termDisplayName}</h1>
						<div className="metadata">
							{
								collectionItems === 'films' ?
								<div>
									{
										itemCreator ?
										<CreatorLink creatorRefName={itemCreator} />
										: null
									}
									<FilmTags film={item} />
								</div>
								: null
							}
							{
								types && types.length ?
								<Tags>
									{
										types.map(type => <Tag>{type}</Tag>)
									}
								</Tags>
								: null
							}
						</div>
					</Col>
					{
						hasSideComponent ?
						<Col sm={6}>
							SideComponent
						</Col>
						: null
					}
				</Row>
			</div>
		</header>
	}
}

export default connect(mapStateToProps)(CollectionItemHeader);
