import React, { Component } from 'react';
import './CalDayTitleHeader.css';

import CalDay from '../CalDay/CalDay';
import ClampedDescription from '../ClampedDescription/ClampedDescription';

const CalDayTitleHeader = ({ startDateTime, endDateTime, title }) =>
	<div className="CalDayTitleHeader container-fluid d-flex">
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

export default CalDayTitleHeader;