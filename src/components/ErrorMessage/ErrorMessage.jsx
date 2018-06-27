import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorMessage.css';

const ErrorMessage = () => (
	<div className="ErrorMessage">
		<h3>Uh oh...</h3>
		<p>
			The server stopped responding. Please try again later.
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

export default ErrorMessage;