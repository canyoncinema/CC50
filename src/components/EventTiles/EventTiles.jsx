import React from 'react';
import { Row, Col } from 'reactstrap';

import EventTile from '../EventTile/EventTile';

const EventTiles = ({data}) => {
	return (
		<Row className="EventTiles">
			{
				data.map((d, i) => {
					return (
						<Col s="4" key={i}>
							<EventTile {...d} key={i} />
						</Col>
					);
				})
			}
		</Row>
	);
};

export default EventTiles;