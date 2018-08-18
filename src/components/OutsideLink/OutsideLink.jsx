import React from 'react';
import PropTypes from 'prop-types';

const toWebLink = link => link.match(/^\S+:\/\//) ? link : '//' + link;

// SPEC: always open outside links in a new tab
const OutsideLink = ({ href, children }) =>
	<a href={toWebLink(href)} target="_blank">{children}</a>

OutsideLink.propTypes = {
	href: PropTypes.string.isRequired,
}

export default OutsideLink;