import React, { Component } from 'react';
import './EventsPage.css';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/events-actions';
import { sortEventsByDate } from "../../utils/parse-data";
import PageHeader from '../PageHeader/PageHeader';
import EventTiles from '../EventTiles/EventTiles';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';

// TODO: will this method of getting past/future events work with requesting more pages of events?
// I think yes because the events query by default has a param to request in descending date.
const mapStateToProps = state => ({
	events: sortEventsByDate(state.events.data)
});

const mapDispatchToProps = dispatch => ({
  getEvents: (...args) => dispatch(getEvents(...args))
});

const PAGE_COUNT = 39;

class EventsPage extends Component {
    paginate = () => {
        const { itemsPageNum } = this.props;
        const page = itemsPageNum + 1;
        console.log('paginate', page, itemsPageNum);
        return this.props.appendItems(
            this.props.collectionItems,
            {
                pgSz: PAGE_COUNT
            },
            page,
        );
        // return Promise.resolve();
    }


	componentDidMount() {
		this.props.getEvents({
		  pgSz: 40,
		  wf_deleted: false
		});
		// TODO: SORT & PAGINATE
  	}

	render() {
		const { events } = this.props;

		return (
			<div className="EventsPage">
				<ScrollToTopOnMount />
				<PageHeader headline="Events" />
                <div className="container content">
					<section>
						<h3 className="event-section-header">Upcoming Events</h3>
						<EventTiles data={events.futureEvents} totalCount={events.futureEvents.length} />
					</section>
					<section>
						<h3 className="event-section-header">Past Events</h3>
						<EventTiles data={events.pastEvents} totalCount={events.pastEvents.length} />
					</section>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);