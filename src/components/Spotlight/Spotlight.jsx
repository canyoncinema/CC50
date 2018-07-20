import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import './Spotlight.css';
import { getSpotlight } from '../../actions/spotlight-actions';

import Button from '../Button/Button';
import LoadingMessage from '../LoadingMessage/LoadingMessage';

const SpotlightListItem = ({isActive, name, note, description}) => {
	console.log('SpotlightItem', arguments);
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

const mapStateToProps = state => ({
  spotlightItems: state.spotlight.data,
  isLoading: state.spotlight.isLoading,
  error: state.spotlight.error
});

const mapDispatchToProps = dispatch => ({
  getSpotlight: () => dispatch(getSpotlight())
});

class Spotlight extends Component {
	componentDidMount() {
    this.props.getSpotlight();
	}

	render() {
		const {
			spotlightItems,
			isLoading,
			error
		} = this.props;

		if (isLoading) {
			return <LoadingMessage />;
		}

		if (error) {
			// fail silently
			return null;
		}

		return (
			<div className="Spotlight">
				<Row>
          <Col sm="12">
            <h1 className="lead">Spotlight</h1>
            <Row>
							<Col md="6">
								{
									spotlightItems.map((d, i) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Spotlight);