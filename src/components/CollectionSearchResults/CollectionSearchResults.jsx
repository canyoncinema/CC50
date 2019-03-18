import React from 'react';
import CollectionSection from '../CollectionSection/CollectionSection';
import { getItemTypeFromRefName } from '../../utils/parse-data';


const CollectionSearchResults = ({viewMode, items}) => {
	return (
		<div className="CollectionSearchResults">
			<CollectionSection
				customColSize={viewMode !== 'list' ? 4 : null}
				customColWidth="sm"
				viewMode={viewMode} 
				searchData={items.map(item => {
					return item;
				})}
			/>
		</div>
	);
}

export default CollectionSearchResults;