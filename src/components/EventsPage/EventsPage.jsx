import React, { Component } from 'react';
import './EventsPage.css';

import EventsPageHeader from '../EventsPageHeader/EventsPageHeader';
import EventTiles from '../EventTiles/EventTiles';

class EventsPage extends Component {
	render() {
		return (
			<div className="EventsPage">
				<EventsPageHeader />
				<div className="content">
					<section>
						<h3>Upcoming Events</h3>
						<EventTiles data={[]} />
					</section>
					<section>
						<h3>Past Events</h3>
						<EventTiles data={[]} />
					</section>
				</div>
			</div>
		);
	}
}

export default EventsPage;
