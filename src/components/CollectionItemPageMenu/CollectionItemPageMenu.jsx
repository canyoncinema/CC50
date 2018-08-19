import React, { Component } from 'react';
import { HashLink } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import Scrollspy from 'react-scrollspy';
import smoothscroll from 'smoothscroll-polyfill';
import { connect } from 'react-redux';

import withScrollNav from '../withScrollNav/withScrollNav';
import './CollectionItemPageMenu.css';

// kick it off
smoothscroll.polyfill();

const mapStateToProps = state => ({
  headers: state.itemMenuHeaders
});

class CollectionItemPageMenu extends Component {
	render() {
		const { headers, isScrollNav } = this.props;
		const orderedHeaders = headers.filter(h => !!h);
		// TODO: known attempted memory leak with Scrollspy. Report/fix.
		return (
			<Scrollspy
				threshold={{ x: 0, y: 0 }}
  			offset={{ top: 0, right: 0, bottom: 0, left: 0 }}
				className={isScrollNav ? 'CollectionItemPageMenu fixed' : 'CollectionItemPageMenu'}
				items={orderedHeaders.map((h, i) => h.id)}
				currentClassName="active">
				{orderedHeaders.map((header, i) =>
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

export default withScrollNav(connect(mapStateToProps)(CollectionItemPageMenu));
