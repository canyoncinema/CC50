import React from 'react';
import { Link } from 'react-router-dom';
import './Page404.css';

const Page404 = () => {
	return (
		<div className="Page404">
			<h3>Uh oh...</h3>
			<p>
				The page you're looking for doesn't exist yet.
			</p>
			<br/>
			<p>
				<Link to="/">Go Home.</Link>
			</p>
			<p>
				<Link to="/collection">Search the Collection.</Link>
			</p>
		</div>
	);
};

export default Page404;
