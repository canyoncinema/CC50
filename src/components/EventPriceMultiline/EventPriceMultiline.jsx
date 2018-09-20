import React from 'react';
import './EventPriceMultiline.css';

const EventPriceMultiline = ({ price }) => { // price: e.g. '$10.00 General Admission / $5.00 Cinematheque members'
	let priceList = price && price.split(/\s*\/\s+/) || []; // e.g. ['$10.00 General Admission', '$5.00 Cinematheque members']
	if (priceList.length) {
		priceList.forEach((price, i) => {
			priceList[i] = price.split(/^(\$\S+)\s+(.+)$/).slice(1, 3); // e.g. ['$10.00', 'Admission']
		});
	}
	return (
		<div className="EventPriceMultiline">
			{
				priceList.map((priceString, i) =>
					<div key={i}>
						<h3>{priceString[0]}</h3>
						<div>{priceString[1]}</div>
					</div>
				)
			}
		</div>
	);
}

export default EventPriceMultiline;