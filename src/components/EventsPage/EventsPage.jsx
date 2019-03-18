import React, { Component } from 'react';
import './EventsPage.css';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/events-actions';
import PageHeader from '../PageHeader/PageHeader';
import EventTiles from '../EventTiles/EventTiles';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import throttle from "../../utils/throttle";
import CollectionSection from "../CollectionSection/CollectionSection";
import { appendEvents } from "../../actions/events-actions";

const mapStateToProps = state => ({
	pastEvents: state.events.pastEvents,
	futureEvents: state.events.futureEvents,
    pastEventsPageNum: state.events.pageNum || 0,
	pastEventsTotalCount: state.events.pastEventsTotalCount,
    totalCount: state.events.totalCount,
    isLoading: state.events.isLoading,
    error: state.events.error,
});

const mapDispatchToProps = dispatch => ({
  getEvents: (...args) => dispatch(getEvents(...args)),
  appendEvents: (...args) => dispatch(appendEvents(...args))

});

const PAGE_COUNT = 39;

class EventsPage extends Component {
    paginate = () => {
        const { pastEventsPageNum } = this.props;
        const page = pastEventsPageNum + 1;
        return this.props.appendEvents(
            {
                pgSz: PAGE_COUNT
            },
            page,
        );
    }

	componentDidMount() {
		this.props.getEvents({
		  pgSz: PAGE_COUNT,
		  wf_deleted: false
		});
		if (this.props.futureEvents && this.props.totalCount) {

		}
  	}

	render() {
		const { events, totalCount, isLoading, error, pastEventsTotalCount, pastEvents, futureEvents } = this.props;
		return (
			<div className="EventsPage">
				<ScrollToTopOnMount />
				<PageHeader headline="Events" />
                <div className="container content">
					<section>
						<h3 className="event-section-header">Upcoming Events</h3>
                        {!isLoading && !error &&
                        <EventTiles
                            data={futureEvents}
                            noPagination={true}
                        />
                        }
					</section>
					<section>
						<h3 className="event-section-header">Past Events</h3>
                        {!isLoading && !error &&
                        <EventTiles
                            data={pastEvents}
                            totalCount={pastEventsTotalCount}
                            noPagination={false}
                            paginate={throttle(this.paginate, 1000)}
                        />
                        }
					</section>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);