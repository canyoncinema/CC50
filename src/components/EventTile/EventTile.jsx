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
			startDateTime,
			photos,
			title,
			venueName,
			location,
			ticketPrice,
			ticketNote
		} = this.props;

		const dateTime = startDateTime ? new Date(startDateTime) : null;
		return (
			<Link to={`/events/${csid}`}>
			<div className="EventTile shadow-on-hover">
				<div className="banner">
					<CalDay dateTime={dateTime} />
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
					<div className="single-line-ellipsed location">{venueName}</div>
					<div><DateTimeString format="time" dateTime={dateTime} /></div>
					{	ticketPrice || ticketNote ?
						<div><TicketPriceString price={ticketPrice} note={ticketNote} /></div>
						: null
					}
				</div>
			</div>
			</Link>
		);
	}
}

export default EventTile;
