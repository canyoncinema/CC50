import React from 'react';
import { Row } from 'reactstrap';
import './CollectionSection.css';

import SearchCards from '../SearchCards/SearchCards';
import Button from '../Button/Button';

const CollectionSection = ({ searchData, header, description, buttonText }) => {
	return (
		<div className="CollectionSection">
			<header className="section-header d-flex">
				<div>
					<h3>{header}</h3>
					<p>
						{description}
					</p>
				</div>
        <Button className="ml-auto" size="default">
          {buttonText}
        </Button>
			</header>
			<Row>
				{
					searchData && searchData.length ?
					<SearchCards data={searchData} />
					: null
				}
			</Row>
		</div>
	);
}

export default CollectionSection;