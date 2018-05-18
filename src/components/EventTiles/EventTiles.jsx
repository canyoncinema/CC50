import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import EventTile from '../EventTile/EventTile';

const EventTiles = ({data}) => {
	return (
		<Row className="EventTiles">
			{
				data.map((d, i) => {
					const isActive = i === 0;
					return (
						<Col s="4">
							<EventTile {...d} key={i} />
						</Col>
					);
				})
			}
		</Row>
	);
};

export default EventTiles;