import React from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import './CollectionSection.css';

import SearchCards from '../SearchCards/SearchCards';
import Button from '../Button/Button';

const CollectionSection = ({ searchData, header, description,
	buttonText, buttonLink }) => {
	return (
		<div className="CollectionSection">
			<header className="section-header d-flex">
				<div>
					<h3>{header}</h3>
					<p>
						{description}
					</p>
				</div>
      	<Link className="ml-auto" to={buttonLink}>
	        <Button size="default">
	          {buttonText}
	        </Button>
      	</Link>
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