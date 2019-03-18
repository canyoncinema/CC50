import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import './EventTile.css';

import ClampedDescription from '../ClampedDescription/ClampedDescription';
import CalDay from '../CalDay/CalDay';
import ChildrenOnly from '../ChildrenOnly/ChildrenOnly';
import PhotoFill from '../PhotoFill/PhotoFill';
import DateTimeString from '../DateTimeString/DateTimeString';
import TicketPriceString from '../TicketPriceString/TicketPriceString';
import ReactMarkdown from 'react-markdown';
import CarouselShowMoreForeground from "../Carousel/CarouselShowMoreForeground";
import CoverCarousel, {MAX_CAROUSEL_IMAGES} from "../Carousel/CoverCarousel";
import {fullSizedCarouselCaption, fullSizedCarouselCaptionLink} from "../../utils/parse-data";
import { CSpaceCanvasSize } from "../CSpacePhoto/CSpacePhoto";
// import { getEventsMedia } from "../../actions/events-media-actions";
// import { getItemsMedia } from "../../actions/items-media-actions"
import connect from "react-redux/es/connect/connect";
import { getItemsMedia } from "../../actions/items-media-actions";


const mapStateToProps = (state, ownProps) => ({
    mediaByRtSbj: state.itemsMedia.dataByRtSbj &&
        state.itemsMedia.dataByRtSbj.get(
            ownProps.csid
        )
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getItemsMedia: 	(...args) => dispatch(getItemsMedia(...args))
});


class EventTile extends Component {
	constructor(props) {
		super(props);
		this.eventNameRef = React.createRef();
	}

    componentDidMount() {
        // get media for this card
        const {csid, refName } = this.props;
        // console.log('Event tile props', this.props);
        // if (!itemType) throw new Error('Requires itemType');
		const item = {
            refName,
            csid,
            mediaIsByRtSbj: true
        };
        this.props.getItemsMedia({item})
    }

	render() {
		const {
			csid,
			showingOpeningDate,
			showingOpeningTime,
			showingPrice,
            mediaByRtSbj,
			title,
			venueDisplayName,
			location,
			ticketNote,
		} = this.props;
		const openingDate = showingOpeningDate ? new Date(showingOpeningDate) : null;
        const listView = false;
        const itemType = 'events';
        return (
			<Link to={`/events/${csid}`} className="EventTile">
			<div className="shadow-on-hover">
				<div className="banner">
					<CalDay dateTime={openingDate} />
                    <div className="media">
                        <CoverCarousel
                            fromCSpace={true}
                            captions={itemType !== 'filmmaker' ?
                                null :
                                (mediaByRtSbj || []).map(m => fullSizedCarouselCaption(m))
                            }
                            captionLinks={itemType !== 'filmmaker' ?
                                null :
                                (mediaByRtSbj || []).map(m => fullSizedCarouselCaptionLink(m))
                            }
                            blobCsids={(mediaByRtSbj || []).map(m => m.blobCsid).slice(0, MAX_CAROUSEL_IMAGES)}
                            canvasSize={CSpaceCanvasSize.event_thumbnail}
                            id={csid}
                            title={title}
                            itemType='events' />
                    </div>
					<PhotoFill src={mediaByRtSbj && mediaByRtSbj[0]} height="100%" />
                    {/*<PhotoFill*/}
                        {/*src={bgPhotoSrc}*/}
                        {/*width="100%"*/}
                        {/*height="100%">*/}
                        {/*<CarouselShowMoreForeground title={title} />*/}
                    {/*</PhotoFill>*/}
				</div>
				<div className="content">
					<h4 className="hover-effect" ref={this.eventNameRef}>
						<ClampedDescription maxLines={2}>
							<ReactMarkdown source={title} renderers={{
								'paragraph': ChildrenOnly,
								'root': ChildrenOnly,
								'listItem': ChildrenOnly
							}} />
						</ClampedDescription>
					</h4>
					<div title={venueDisplayName} className="single-line-ellipsed location">{venueDisplayName}</div>
					<div className="time-string">{showingOpeningTime}</div>
					<div title={showingPrice} className="single-line-ellipsed location">{showingPrice}</div>
				</div>
			</div>
			</Link>
		);
	}
}

// export default EventTile;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventTile));
