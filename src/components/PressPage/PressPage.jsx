import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import SecondaryPage from '../SecondaryPage/SecondaryPage';
import ComingSoonMessage from '../ComingSoonMessage/ComingSoonMessage';

class PressPage extends Component {
    render() {
        return (
            <SecondaryPage
                headline="Press"
                className="PressPage">
                <Helmet>
                    <title>About | Canyon Cinema</title>
                </Helmet>
                <ComingSoonMessage />
            </SecondaryPage>
        );
    }
}

export default PressPage;
