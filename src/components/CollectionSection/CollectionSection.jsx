import React from 'react';
import { Link } from 'react-router-dom';
import './CollectionSection.css';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import SearchCards from '../SearchCards/SearchCards';
import Button from '../Button/Button';

const CollectionSection = ({
	isLoading, error, paginate,
	customColSize, customColWidth, className, viewMode, itemType,
	searchData, searchTotalCount, searchPageCount,
	header, description, id,
	buttonText, buttonLink }) => {
	return (
		<div className={[className, 'CollectionSection'].join(' ')}>
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
				isLoading ? <LoadingMessage />
				: error ? <ErrorMessage />
				: null
			}
			{
				searchData && searchData.length &&
				<SearchCards
					id={id}
					paginate={paginate}
					itemType={itemType}
					customColSize={customColSize}
					customColWidth={customColWidth}
					viewMode={viewMode}
					data={searchData}
					pageCount={searchPageCount}
					totalCount={searchTotalCount}
				/>
			}
		</div>
	);
}

export default CollectionSection;
