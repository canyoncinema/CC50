import React from 'react';
import Filmmaker from '../Filmmaker/Filmmaker';
import './Filmmakers.css';

const Filmmakers = ({ data }) => (
	<div className="Filmmakers">
		{
			data.map((d, i) => (
				<Filmmaker key={i} {...d} />
			))
		}
	</div>
);

export default Filmmakers;