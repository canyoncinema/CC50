import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import SecondaryPage from '../SecondaryPage/SecondaryPage';
import ComingSoonMessage from '../ComingSoonMessage/ComingSoonMessage';

class AboutPage extends Component {
	render() {
		return (
			<SecondaryPage
				headline="About"
				className="AboutPage">
				<Helmet>
	        <title>About | Canyon Cinema</title>
	      </Helmet>
				<ComingSoonMessage />
			</SecondaryPage>
		);
	}
}

export default AboutPage;
