import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Scrollspy from 'react-scrollspy';
import './CollectionPageItemMenu.css';

const CollectionPageItemMenu = ({ headers }) => {
	return (
		<Scrollspy
			className="CollectionPageItemMenu"
			items={headers.map((h, i) => 'section-' + i)}
			currentClassName="active">
			{headers.map((header, i) =>
				<li>
					<Link to={'#section-' + i}>{header}</Link>
				</li>
			)}
		</Scrollspy>
	);
}

CollectionPageItemMenu.propTypes = {
	headers: PropTypes.array.isRequired
}

export default CollectionPageItemMenu;