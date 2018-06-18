import React, { Component } from 'react';
import './CollectionItemHeader.css';

import { Row, Col } from 'reactstrap';
import { toCollectionSearchLabel } from '../../collection-context';

import Tags from '../Tags/Tags';
import Tag from '../Tag/Tag';

class CollectionItemHeader extends Component {

	render() {
		const {
			collapsed,
			collectionItems,
			title,
			displayName,
			// films & programs
			media,
			format,
			// films
			creator,
			created,
			image,
			sound,
			years,
			// filmmakers
			avatar,
			// ephemera
			types
		} = this.props;
		const hasSideComponent = avatar || (media && media.length);
		return <header className={`CollectionItemHeader container-fluid ${collectionItems} no-gutters`}>
			<div className="container">
				<Row>
					<Col sm={hasSideComponent ? 6 : 12}>
						<label>{toCollectionSearchLabel(collectionItems)}</label>
						<h1 className="white">{displayName}</h1>
						<div className="metadata">
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

export default CollectionItemHeader;
