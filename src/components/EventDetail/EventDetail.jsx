import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './EventDetail.css';
import { connect } from 'react-redux';
import { getEventDetail } from '../../actions/event-detail-actions';

import EventDetailSide from '../EventDetailSide/EventDetailSide';
import CollectionItemPageMenu from '../CollectionItemPageMenu/CollectionItemPageMenu';
import CalDayTitleHeader from '../CalDayTitleHeader/CalDayTitleHeader';
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
	eventFilms: state.eventDetail.films,
});

const mapDispatchToProps = dispatch => ({
	getEventDetail: (...args) => dispatch(getEventDetail(...args))
})

class EventDetail extends Component {
	componentDidMount() {
		this.props.getEventDetail(this.props.csid);
	}

	render() {
		const { csid, event, eventFilms, error, isLoading } = this.props;
		if (error) {
			return <ErrorMessage />
		}
		if (isLoading) {
			return <LoadingMessage />
		}
		return (
			<div className="EventDetail">
				<ScrollToTopOnMount />
				<CalDayTitleHeader
					startDateTime={event.showingOpeningDate}
					endDateTime={event.showingClosingDate}
					title={event.title}
				/>
				<Row className="content">
					<Col md={3}>
						<EventDetailSide event={event} />
					</Col>
					<Col md={9}>
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
								<h3>Films in this Event</h3> :
                                <h3>No Films in this Event</h3>
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