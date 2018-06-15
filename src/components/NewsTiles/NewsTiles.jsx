import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import NewsTile from '../NewsTile/NewsTile';

const NewsTiles = ({className, customColSize, data}) => {
	return (
		<Row className={[className, 'NewsTiles'].join(' ')}>
			{
				data.map((d, i) => {
					return (
						<Col key={i} sm={customColSize || 4}>
							<NewsTile {...d} key={i} />
						</Col>
					);
				})
			}
		</Row>
	);
};

export default NewsTiles;
