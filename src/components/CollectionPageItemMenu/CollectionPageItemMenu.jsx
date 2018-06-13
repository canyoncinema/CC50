import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import Scrollspy from 'react-scrollspy';
import smoothscroll from 'smoothscroll-polyfill';

import withScrollNav from '../withScrollNav/withScrollNav';
import './CollectionPageItemMenu.css';

// kick it off
smoothscroll.polyfill();

class CollectionPageItemMenu extends Component {
	render() {
		const { headers, isScrollNav } = this.props;
		return (
			<Scrollspy
				className={isScrollNav ? 'CollectionPageItemMenu fixed' : 'CollectionPageItemMenu'}
				items={headers.map((h, i) => 'section-' + i)}
				currentClassName="active">
				{headers.map((header, i) =>
					<li key={i}>
						<HashLink
							scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
							to={'#section-' + i}>{header}</HashLink>
					</li>
				)}
			</Scrollspy>
			);
	}
}

CollectionPageItemMenu.propTypes = {
	headers: PropTypes.array.isRequired
}

export default withScrollNav(CollectionPageItemMenu);