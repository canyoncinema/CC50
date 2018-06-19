import React from 'react';
import { Link } from 'react-router-dom';
import './CollectionSection.css';

import SearchCards from '../SearchCards/SearchCards';
import Button from '../Button/Button';

const CollectionSection = ({ viewMode, itemType, searchData, header, description,
	buttonText, buttonLink }) => {
	return (
		<div className="CollectionSection">
			{
				header ?
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
				: null
			}
			{
				searchData && searchData.length ?
				<SearchCards
					itemType={itemType}
					viewMode={viewMode}
					data={searchData} />
				: null
			}
		</div>
	);
}

export default CollectionSection;