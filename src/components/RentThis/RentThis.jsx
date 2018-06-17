import React from 'react';
import './RentThis.css';

import Button from '../Button/Button';

// TODO: put in utils
function onlyUnique(value, index, self) { 
   return self.indexOf(value) === index;
}

const toPriceString = price => !Number.isInteger(price) && Number.isInteger(price * 10) ?
		String(price) + '0'
		: String(price);

/*
options are { price, format, type }

collapsed options are uniq by price & look like:

[{
	price: 35,
	formats: ['16mm', '32mm']
	types: ['Individual']
}, {
	price: 65,
	formats: ['16mm'],
	types: ['Institutional']
}]

*/
/*
const toCollapsedData = rentalOptions => rentalOptions
	.sort((a, b) => a.price > b.price)
	.reduce((collapsedOptions, option) => {
		if (!collapsedOptions.length) {
			collapsedOptions.push({
				price: option.price,
				formats: [option.format],
				types: [option.type]
			});
			return collapsedOptions;
		}
		if (collapsedOptions[collapsedOptions.length - 1].price === option.price) {
			// collapse!
			collapsedOptions.formats = collapsedOptions.formats.concat([option.format])
		}
	}, []);

*/


const RentThis = ({ rentalPrice, rentalPriceIsPublished, rentalFormats, rentalFormId }) =>
<div className="RentThis d-flex">
	<div>
		<div className="price">{rentalPriceIsPublished ?
			'$' + toPriceString(rentalPrice)
			: 'Inquire for Pricing'
		}</div>
		<div>
			<small>
				Available Format{rentalFormats && rentalFormats.length === 1 ?
				'' : 's'}: {rentalFormats.join(', ')}
			</small>
		</div>
	</div>
	<div className="ml-auto">
		<Button className="default" size="small"
			to={'http://canyoncinema.com/clients/rental-inquiry-form/' + rentalFormId}>
			Rent
		</Button>
	</div>
</div>;

export default RentThis;