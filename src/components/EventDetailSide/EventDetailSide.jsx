import React, { Component } from 'react';
import './EventDetailSide.css';

import Button from '../Button/Button';
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
						{
							event.startDateTime ?
							<span className="time"><DateTimeString format="time" dateTime={event.startDateTime} /></span>
							: null
						}
					</li>
					<li className="venue">
						{
							event.venueUrl ?
							<OutsideLink href={event.venueUrl}>{event.venueDisplayName}</OutsideLink>
							: event.venueDisplayName
						}
					</li>
					<li className="venue">
						{
							event.socialmediaUrl ?
							<OutsideLink href={event.socialmediaUrl}>Facebook Event</OutsideLink>
							: null
						}
					</li>
				</ul>
				{
					event.price ?
					<div className="price">
						{event.price}
					</div>
					: null
				}
				{
					event.infoUrl ?
					<OutsideLink href={event.infoUrl}>
						<Button size="small" style="default">More Info</Button>
					</OutsideLink>
					: null
				}
			</div>
		);
	}
}

export default withScrollNav(EventDetailSide);