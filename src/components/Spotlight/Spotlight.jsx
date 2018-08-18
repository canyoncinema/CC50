import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import './Spotlight.css';
import { getSpotlight } from '../../actions/spotlight-actions';

import { CSpaceCanvasSize } from '../CSpacePhoto/CSpacePhoto';
import Button from '../Button/Button';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import CSpacePhotoImg from '../CSpacePhotoImg/CSpacePhotoImg';
import CSpacePhotoFill from '../CSpacePhotoFill/CSpacePhotoFill';

const SpotlightListItem = ({isActive,
	onMouseEnter, onMouseLeave,
	item, media}) => {
	if (item.isLoading) {
		return <LoadingMessage />
	}
	if (item.error) {
		return <ErrorMessage error={item.error} />
	}
	const data = item.data || {};
	return (
		<div className="container-fluid"
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<Link to={data.link || '/collection'}>
				<Row className={isActive ? 'SpotlightListItem active' : 'SpotlightListItem'}>
					<Col lg="6">
						<h3 title={data.name} className="single-line-ellipsed">{data.name}</h3>
						<h6 className="uppercase">{data.note}</h6>
					</Col>
					<Col lg="6">
						<p className="small">
							{data.description}
						</p>
					</Col>
				</Row>
			</Link>
		</div>
	);
};

const mapStateToProps = state => ({
  spotlightMedia: state.spotlight.media,
  spotlightItems: state.spotlight.items,
  isLoading: state.spotlight.isLoading,
  error: state.spotlight.error
});

const mapDispatchToProps = dispatch => ({
  getSpotlight: () => dispatch(getSpotlight())
});

const loopInterval = 3000;
const numItems = 3;

class Spotlight extends Component {
	constructor(props) {
		super(props);
		this.interval = null;
	}

	componentDidMount() {
    this.props.getSpotlight();

    this.startCarousel();
	}

	componentWillUnmount() {
		this.endCarousel();
	}

	state = {
		activePhotoIndex: 0
	}

	startCarousel() {
		// loop every 3 seconds
    this.interval = setInterval(() => {
    	this.setState({
    		activePhotoIndex: (this.state.activePhotoIndex + 1) % numItems
    	})
    }, loopInterval);
	}

	endCarousel() {
		clearInterval(this.interval);
	}

	onMouseEnterItem = (i) => {
		this.setState({
			activePhotoIndex: i
		});
		// pause the carousel
		this.endCarousel();
	}

	onMouseLeaveItem = () => {
		// restart the carousel
		this.startCarousel();
	}

	render() {
		const {
			spotlightMedia,
			spotlightItems,
			isLoading,
			error
		} = this.props;
		const { activePhotoIndex } = this.state;

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
            <Row className="no-gutters">
							<Col md="6">
								{
									spotlightMedia.map((mediaItem, i) => {
										const isActive = i === activePhotoIndex;
										return (
											<SpotlightListItem
												onClick={() => this.onClickItem(spotlightItems[i])}
												onMouseEnter={() => this.onMouseEnterItem(i)}
												onMouseLeave={this.onMouseLeaveItem}
												isActive={isActive}
												item={spotlightItems[i]}
												media={mediaItem}
												key={i} />
										);
									})
								}
							</Col>
							<Col md="6" className="photo-wrapper">
								{
									spotlightMedia.map((mediaItem, i) => {
										return (
											<CSpacePhotoFill
												key={i}
												className={
													activePhotoIndex === i ? 'active' : ''}
												blobCsid={
													spotlightMedia &&
													spotlightMedia[i] &&
													spotlightMedia[i].blobCsid
												}
												canvasSize={CSpaceCanvasSize.original}
											/>
										);
									})
								}
							</Col>
						</Row>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Link to="/collection">
	            <Button className="explore-collection-btn" size="large">
	              Explore the Collection
	            </Button>
            </Link>
          </Col>
        </Row>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Spotlight);