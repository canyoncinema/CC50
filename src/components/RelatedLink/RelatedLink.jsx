import React from 'react';
import { Link } from 'react-router-dom';
import './RelatedLink.css';

export default ({to, children, isLast}) => {
	return <Link to={to}>{children}{isLast ? '' : ', '}</Link>
}