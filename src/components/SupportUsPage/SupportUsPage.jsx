import React, { Component } from 'react';

import SecondaryPage from '../SecondaryPage/SecondaryPage';
import ComingSoonMessage from '../ComingSoonMessage/ComingSoonMessage';

class SupportUsPage extends Component {
	render() {
		return (
			<SecondaryPage
				headline="Support Us"
				className="SupportUsPage">
				<ComingSoonMessage />
			</SecondaryPage>
		);
	}
}

export default SupportUsPage;
