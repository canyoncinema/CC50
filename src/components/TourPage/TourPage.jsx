import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import SecondaryPage from '../SecondaryPage/SecondaryPage';

class TourPage extends Component {
	render() {
		return (
			<SecondaryPage
				headline="Tour"
				className="TourPage">
				<Helmet>
	        <title>About | Canyon Cinema</title>
	      </Helmet>
				TourPage
			</SecondaryPage>
		);
	}
}

export default TourPage;
