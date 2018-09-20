import React, { Component } from 'react';
import './EventDetailSide.css';

import Button from '../Button/Button';
import EventPriceMultiline from '../EventPriceMultiline/EventPriceMultiline';
import OutsideLink from '../OutsideLink/OutsideLink';
import withScrollNav from '../withScrollNav/withScrollNav';
import DateTimeString from '../DateTimeString/DateTimeString';

class EventDetailSide extends Component {
	render() {
		const { isScrollNav, event } = this.props;
		// TODO: Multi-times representation

		// single event

		// multiple showings in a single venue

		// multiple showings over multiple venues

		// when a showing has multiple times in a day, collapse

		return (
			<div className={isScrollNav ? 'EventDetailSide fixed' : 'EventDetailSide'}
			>
				<ul>
					<li className="times">
						{ event.showingOpeningTime && <span className="time-string">{event.showingOpeningTime}</span> }
					</li>
					<li>
						{ event.venueUrl ?
							<OutsideLink href={event.venueUrl}>{event.venueDisplayName}</OutsideLink>
							: event.venueDisplayName
						}
					</li>
					<li>
						{ event.socialmediaUrl &&
							<OutsideLink href={event.socialmediaUrl}>Facebook Event</OutsideLink> }
					</li>
				</ul>
				{ event.showingPrice && <EventPriceMultiline price={event.showingPrice} /> }
				{
					event.showingTicketUrl &&
					<OutsideLink href={event.showingTicketUrl}>
						<Button size="small" style="default">Tickets</Button>
					</OutsideLink>
				}
				{
					event.infoUrl &&
					<OutsideLink href={event.infoUrl}>
						<Button size="small" style="default">More Info</Button>
					</OutsideLink>
				}
			</div>
		);
	}
}

export default withScrollNav(EventDetailSide);