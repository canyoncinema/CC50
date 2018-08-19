import React, { Component } from 'react';
import './EventsPage.css';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/events-actions';

import EventsPageHeader from '../EventsPageHeader/EventsPageHeader';
import EventTiles from '../EventTiles/EventTiles';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';

const mapStateToProps = state => ({
  events: state.events.data
});

const mapDispatchToProps = dispatch => ({
  getEvents: (...args) => dispatch(getEvents(...args))
});

class EventsPage extends Component {
	componentDidMount() {
    this.props.getEvents({
      pgSz: 40
    });
    // TODO: SORT & PAGINATE
  }

	render() {
		const { events } = this.props;

		return (
			<div className="EventsPage">
				<ScrollToTopOnMount />
				<EventsPageHeader />
				<div className="content">
				{
					events && events.length ?
					<EventTiles data={events} />
					: null
				}
				</div>
			</div>
		);
	}
}
/*
PUNT: UPCOMING VS PAST
<section>
	<h3>Upcoming Events</h3>
	<EventTiles data={[]} />
</section>
<section>
	<h3>Past Events</h3>
	<EventTiles data={[]} />
</section>
*/
export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);