import React, { Component } from 'react';
import './CalDayTitleHeader.css';


import Tags from '../Tags/Tags';
import CalDay from '../CalDay/CalDay';
import ClampedDescription from '../ClampedDescription/ClampedDescription';

const CalDayTitleHeader = ({ startDateTime, tags, author, endDateTime, title }) =>
	<div className="CalDayTitleHeader container-fluid">
		<div className="container d-flex">
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
					{ author && <div className="author">By {author}</div> }
					{ tags && <Tags isReadOnly={true} tags={tags} />
					}
				</div>
			</div>
		</div>
	</div>

export default CalDayTitleHeader;