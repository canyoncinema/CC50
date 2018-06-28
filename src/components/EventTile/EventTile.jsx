import React, { Component } from 'react';
import './EventTile.css';

import ClampedDescription from '../ClampedDescription/ClampedDescription';
import CalDay from '../CalDay/CalDay';
import PhotoFill from '../PhotoFill/PhotoFill';
import DateTimeString from '../DateTimeString/DateTimeString';
import TicketPriceString from '../TicketPriceString/TicketPriceString';
import ReactMarkdown from 'react-markdown';

class EventTile extends Component {
	constructor(props) {
		super(props);
		this.eventNameRef = React.createRef();
	}

	componentDidMount() {
		const eventName = this.eventNameRef.current;
		// ellipse-overflow rules:
		// event name ellipses after 2 lines; location ellipses after 1 line
		// $clamp(eventName, { clamp: 2 });
	}

	render() {
		const {
			startDateTime,
			photos,
			name,
			location,
			ticketPrice,
			ticketNote
		} = this.props;

		const dateTime = new Date(startDateTime);
		return (
			<div className="EventTile shadow-on-hover">
				<div className="banner">
					<CalDay dateTime={dateTime} />
					<PhotoFill src={photos[0]} height="100%" />
				</div>
				<div className="content">
					<h4 className="hover-effect" ref={this.eventNameRef}>
						<ClampedDescription maxLines={2}>
							<ReactMarkdown source={name} renderers={{
								'paragraph': (text) => text,
								'text': text => text
							}} />
						</ClampedDescription>
					</h4>
					<div className="single-line-ellipsed" className="location">{location.name}</div>
					<div><DateTimeString format="time" dateTime={dateTime} /></div>
					<div><TicketPriceString price={ticketPrice} note={ticketNote} /></div>
				</div>
			</div>
		);
	}
}

export default EventTile;
