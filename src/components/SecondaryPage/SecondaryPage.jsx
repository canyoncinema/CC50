import React, { Component } from 'react';
import './SecondaryPage.css';

import PageHeader from '../PageHeader/PageHeader';

class SecondaryPage extends Component {
	render() {
		const { className, headline, children } = this.props;
		return (
			<div className={['SecondaryPage', className].join(' ')}>
				<PageHeader headline={headline} />
				<section className="content">
					{children}
				</section>
			</div>
		);
	}
}

export default SecondaryPage;