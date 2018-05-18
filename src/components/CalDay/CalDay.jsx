import React from 'react';
import './CalDay.css';

const getMonthString = dateTime => {
	// numbered 0 to 11 in JS Date
	const label = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
	return label[dateTime.getMonth()];
};

const CalDay = ({dateTime}) => {
	const date = dateTime.getDate(),
				month = getMonthString(dateTime),
				year = dateTime.getFullYear();
	return (
		<div className="CalDay">
			<div className="month">{month}</div>
			<div className="date">{date}</div>
			<div className="year">{year}</div>
		</div>
	);
};

export default CalDay;