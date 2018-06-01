const getTimeString = dateTime => dateTime
																	.toLocaleTimeString()
																	.replace(/:(\d+)\s+/, '')
																	.toLowerCase();
const longMonthFormat = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const getLongMonthString = dateTime => {
	return longMonthFormat[dateTime.getMonth()];
};

export default ({dateTime, format}) => {
	dateTime = new Date(dateTime);
	switch (format) {
		case 'time':
			return getTimeString(dateTime);
		case 'long-date':
			return `${getLongMonthString(dateTime)} ${dateTime.getDate()}, ${dateTime.getFullYear()}`;
		default:
			throw new Error('Unknown datetime format');
	}
};