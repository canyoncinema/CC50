import React, { Component } from 'react';
import $clamp from 'clamp-js';

import './EventTile.css';

import CalDay from '../CalDay/CalDay';
import PhotoFill from '../PhotoFill/PhotoFill';
import DateTimeString from '../DateTimeString/DateTimeString';

class EventTile extends Component {
	constructor(props) {
		super(props);
		this.eventNameRef = React.createRef();
		this.eventLocationRef = React.createRef();
	}

	componentDidMount() {
		const eventName = this.eventNameRef.current,
					eventLocation = this.eventLocationRef.current;
		// ellipse-overflow rules:
		// event name ellipses after 2 lines; location ellipses after 1 line
		$clamp(eventName, { clamp: 2 });
		$clamp(eventLocation, { clamp: 1 });
	}

	render() {
		const {
			startDateTime,
			photos,
			name,
			location,
			ticketPrice,
			ticketPriceNote
		} = this.props;

		const dateTime = new Date(startDateTime);
		const ticketPriceString = !isNaN(ticketPrice) ? '$' + ticketPrice : ticketPrice;
		return (
			<div className="EventTile">
				<div className="banner">
					<CalDay dateTime={dateTime} />
					<PhotoFill src={photos[0]} height="100%" />
				</div>
				<div className="content">
					<h4 ref={this.eventNameRef}>{name}</h4>
					<div ref={this.eventLocationRef} className="location">{location.name}</div>
					<div><DateTimeString format="time" dateTime={dateTime} /></div>
					<div>{ticketPriceString}</div>
				</div>
			</div>
		);
	}
}

export default EventTile;