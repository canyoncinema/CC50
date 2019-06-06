import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './EventDetail.css';
import { connect } from 'react-redux';
import { getEventDetail } from '../../actions/event-detail-actions';

import EventDetailSide from '../EventDetailSide/EventDetailSide';
import CollectionItemPageMenu from '../CollectionItemPageMenu/CollectionItemPageMenu';
import CalDayTitleHeader from '../CalDayTitleHeader/CalDayTitleHeader';
import EventDetailHeader from '../EventDetailHeader/EventDetailHeader';
import EventDetailFilm from '../EventDetailFilm/EventDetailFilm';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import RichText from '../RichText/RichText';
import ReactMarkdown from 'react-markdown';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';

const mapStateToProps = state => ({
	event: state.eventDetail.data,
	isLoading: state.eventDetail.isLoading,
	error: state.eventDetail.error,
	eventFilms: state.eventDetail.films
});

const mapDispatchToProps = dispatch => ({
	getEventDetail: (...args) => dispatch(getEventDetail(...args))
})

class EventDetail extends Component {
	componentDidMount() {
		this.props.getEventDetail(this.props.csid);
	}

	render() {
		const { csid, event, error, isLoading } = this.props;
		if (error) {
			return <ErrorMessage />
		}
		if (isLoading) {
			return <LoadingMessage />
		}
		console.log('event', event);
		return (
			<div className="EventDetail">
				<ScrollToTopOnMount />
				<EventDetailHeader
					startDateTime={event.showingOpeningDate}
					endDateTime={event.showingClosingDate}
					title={event.title}
					rtSbj={csid}
				/>
				<Row className="content">
					<Col lg={3}>
						<EventDetailSide event={event} />
					</Col>
					<Col lg={9}>
						{
							event.boilerplateText ?
							<section>
								<h3>About the Event</h3>
								<RichText>
									<ReactMarkdown source={event.boilerplateText} />
								</RichText>
							</section>
							: null
						}
						{
                            event.films && event.films.length ?
								<h3>Canyon Cinema distributed films in this event</h3> :
                                null
						}
						{
							event.films && event.films.length ?
							event.films.map((film, i) =>
								<EventDetailFilm
									key={i}
									filmRefName={film.refName} />
							)
							: null
						}
					</Col>
				</Row>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);