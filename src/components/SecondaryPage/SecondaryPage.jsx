import React, { Component } from 'react';
import './SecondaryPage.css';

import PageHeader from '../PageHeader/PageHeader';

class SecondaryPage extends Component {
	render() {
		const { className, headline, children, renderBelowHeader } = this.props;
		return (
			<div className={['SecondaryPage', className].join(' ')}>
				<PageHeader headline={headline} />
				{
					renderBelowHeader && renderBelowHeader()
				}
				<section className="content">
					{children}
				</section>
			</div>
		);
	}
}

export default SecondaryPage;