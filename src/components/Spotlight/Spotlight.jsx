import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './Spotlight.css';

import Button from '../Button/Button';

const SpotlightListItem = ({isActive, name, note, description}) => {
	return (
		<div className="container-fluid">
			<Row className={`SpotlightListItem${isActive ? ' active' : ''}`}>
				<Col md="6">
					<h3>{name}</h3>
					<h6 className="uppercase">{note}</h6>
				</Col>
				<Col md="6">
					<p className="small">
						{description}
					</p>
				</Col>
			</Row>
		</div>
	);
};

class Spotlight extends Component {
	render() {
		const { data } = this.props;

		return (
			<div className="Spotlight">
				<Row>
          <Col sm="12">
            <h1 className="lead">Spotlight</h1>
            <Row>
							<Col md="6">
								{
									data.map((d, i) => {
										d.isActive = i === 0;
										return (
											<SpotlightListItem {...d} key={i} />
										);
									})
								}
							</Col>
							<Col md="6">
								Photo
							</Col>
						</Row>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Button className="explore-collection-btn" size="large">
              Explore the Collection
            </Button>
          </Col>
        </Row>
			</div>
		);
	}
}

export default Spotlight;