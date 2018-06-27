import React from 'react';
import './RentThis.css';
import { getNameFromFilmFormat } from '../../utils/parse-data';

import Button from '../Button/Button';

// TODO: put in utils
function onlyUnique(value, index, self) { 
   return self.indexOf(value) === index;
}

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
			rentalPrice
			: 'Inquire for Pricing'
		}</div>
		<div>
			<small>
				Available Format{rentalFormats && rentalFormats.length === 1 ?
				'' : 's'}: {rentalFormats.map(formatRefName => getNameFromFilmFormat(formatRefName)).join(', ')}
			</small>
		</div>
	</div>
	<div className="ml-auto">
		<a target="_blank" href={'http://canyoncinema.com/clients/rental-inquiry-form/' + (rentalFormId || '')}>
			<Button className="default" size="small">
				Rent
			</Button>
		</a>
	</div>
</div>;

export default RentThis;