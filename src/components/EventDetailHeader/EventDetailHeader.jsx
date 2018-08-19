import React from 'react';
import './EventDetailHeader.css';

import CalDay from '../CalDay/CalDay';
import ClampedDescription from '../ClampedDescription/ClampedDescription';

const EventDetailHeader = ({ startDateTime, endDateTime, title }) =>
	<div className="EventDetailHeader container-fluid d-flex">
		<div className="date-wrapper">
			{
				startDateTime ?
				<CalDay className="white" dateTime={startDateTime} />
				: null
			}
		</div>
		<div className="title-wrapper list-center-wrapper">
			<div>
				<ClampedDescription maxLines={2}>
					<h1 title={title} className="white">
						{title}
					</h1>
				</ClampedDescription>
			</div>
		</div>
	</div>

export default EventDetailHeader;