import React, { Component } from 'react';
import './CalDayTitleHeader.css';


import Tags from '../Tags/Tags';
import CalDay from '../CalDay/CalDay';
import ClampedDescription from '../ClampedDescription/ClampedDescription';

// TODO: if showing the actual date is conditional, maybe this component sould be renamed
const CalDayTitleHeader = ({ startDateTime, tags, author, endDateTime, title, maxLines=2, type }) =>
	<div className="CalDayTitleHeader container-fluid">
		<div className="container d-flex">
			<div className="date-wrapper">
				{
					startDateTime && type !== "ephemera" ?
					<CalDay className="white" dateTime={startDateTime} />
					: null
				}
			</div>
			<div className="title-wrapper list-center-wrapper">
				<div>
					<ClampedDescription maxLines={maxLines}>
						<h1 title={title} className="white">
							{title}
						</h1>
					</ClampedDescription>
					{ author && <div className="author">By {author}</div> }
					{ tags && <Tags isReadOnly={true} tags={tags} />
					}
				</div>
			</div>
		</div>
	</div>

export default CalDayTitleHeader;