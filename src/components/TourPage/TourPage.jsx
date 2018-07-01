import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import SecondaryPage from '../SecondaryPage/SecondaryPage';
import ComingSoonMessage from '../ComingSoonMessage/ComingSoonMessage';

class TourPage extends Component {
	render() {
		return (
			<SecondaryPage
				headline="Tour"
				className="TourPage">
				<Helmet>
	        <title>About | Canyon Cinema</title>
	      </Helmet>
				<ComingSoonMessage />
			</SecondaryPage>
		);
	}
}

export default TourPage;
