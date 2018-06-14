import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import Scrollspy from 'react-scrollspy';
import smoothscroll from 'smoothscroll-polyfill';

import withScrollNav from '../withScrollNav/withScrollNav';
import './CollectionItemPageMenu.css';

// kick it off
smoothscroll.polyfill();

class CollectionItemPageMenu extends Component {
	render() {
		const { headers, isScrollNav } = this.props;
		return (
			<Scrollspy
				className={isScrollNav ? 'CollectionItemPageMenu fixed' : 'CollectionItemPageMenu'}
				items={headers.map((h, i) => h.id)}
				currentClassName="active">
				{headers.map((header, i) =>
					<li key={i}>
						<HashLink
							scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
							to={'#' + header.id}>{header.content}</HashLink>
					</li>
				)}
			</Scrollspy>
			);
	}
}

CollectionItemPageMenu.propTypes = {
	headers: PropTypes.array.isRequired
}

export default withScrollNav(CollectionItemPageMenu);