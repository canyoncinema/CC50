import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './EventTile.css';

import ClampedDescription from '../ClampedDescription/ClampedDescription';
import CalDay from '../CalDay/CalDay';
import ChildrenOnly from '../ChildrenOnly/ChildrenOnly';
import PhotoFill from '../PhotoFill/PhotoFill';
import DateTimeString from '../DateTimeString/DateTimeString';
import TicketPriceString from '../TicketPriceString/TicketPriceString';
import ReactMarkdown from 'react-markdown';

class EventTile extends Component {
	constructor(props) {
		super(props);
		this.eventNameRef = React.createRef();
	} 

	render() {
		const {
			csid,
			showingOpeningDate,
			showingOpeningTime,
			showingPrice,
			photos,
			title,
			venueDisplayName,
			location,
			ticketNote,
		} = this.props;

		const openingDate = showingOpeningDate ? new Date(showingOpeningDate) : null;
		return (
			<Link to={`/events/${csid}`} className="EventTile">
			<div className="shadow-on-hover">
				<div className="banner">
					<CalDay dateTime={openingDate} />
					<PhotoFill src={photos && photos[0]} height="100%" />
				</div>
				<div className="content">
					<h4 className="hover-effect" ref={this.eventNameRef}>
						<ClampedDescription maxLines={2}>
							<ReactMarkdown source={title} renderers={{
								'paragraph': ChildrenOnly,
								'root': ChildrenOnly,
								'listItem': ChildrenOnly
							}} />
						</ClampedDescription>
					</h4>
					<div title={venueDisplayName} className="single-line-ellipsed location">{venueDisplayName}</div>
					<div className="time-string">{showingOpeningTime}</div>
					<div title={showingPrice} className="single-line-ellipsed location">{showingPrice}</div>
				</div>
			</div>
			</Link>
		);
	}
}

export default EventTile;
