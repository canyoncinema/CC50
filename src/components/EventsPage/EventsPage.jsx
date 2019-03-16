import React, { Component } from 'react';
import './EventsPage.css';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/events-actions';

import PageHeader from '../PageHeader/PageHeader';
import EventTiles from '../EventTiles/EventTiles';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';

const mapStateToProps = state => ({
  events: state.events.data,
  totalCount: state.events.totalCount,
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
		const { events, totalCount } = this.props;

		return (
			<div className="EventsPage">
				<ScrollToTopOnMount />
				<PageHeader headline="Events" />
				<div className="container content">
				{
					events && events.length ?
					<EventTiles
						totalCount={totalCount}
						data={events} />
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