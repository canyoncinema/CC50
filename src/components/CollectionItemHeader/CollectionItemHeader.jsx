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
		return <header className={`CollectionItemHeader container-fluid ${collectionItems} no-gutters`}>
			<div className="container">
				<Row>
					<Col sm={6}>
						<label>{toCollectionSearchLabel(collectionItems)}</label>
						<h1 className="white">{title}</h1>
						<div className="metadata">
							MetaComponent
						</div>
					</Col>
					<Col sm={6}>
						SideComponent
					</Col>
				</Row>
			</div>
		</header>
	}
}

export default CollectionItemHeader;
