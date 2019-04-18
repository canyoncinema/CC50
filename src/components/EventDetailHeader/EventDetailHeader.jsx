import React, {Component} from 'react';
import './EventDetailHeader.css';

import CalDay from '../CalDay/CalDay';
import ClampedDescription from '../ClampedDescription/ClampedDescription';
import { Col } from 'reactstrap';
import ThumbnailCarousel from "../ThumbnailCarousel/ThumbnailCarousel";
import connect from "react-redux/es/connect/connect";

const mapStateToProps = (state, ownProps) => ({
	ownProps,
    itemMediaByRtSbj: state.itemsMedia.dataByRtSbj.get(ownProps.rtSbj),
	media: state.itemsMedia
})

class EventDetailHeader extends Component {
    render() {
    	const { media, ownProps, item, itemMediaByRtSbj, isCollapsed, startDateTime, endDateTime, title } = this.props;
        const hasSideComponent = itemMediaByRtSbj && itemMediaByRtSbj.length;
        return <div className="EventDetailHeader container-fluid d-flex">
            <div className="date-wrapper">
                {
                    startDateTime ?
                        <CalDay className="white" dateTime={startDateTime} />
                        : null
                }
            </div>
            <div className="title-wrapper list-center-wrapper">
                <div>
                    <h1 title={title} className="white">
                        {title}
                    </h1>
                </div>
            </div>
            {
                hasSideComponent ?
                        <Col sm={6} className="carousel-wrapper">
                            {/*<div className="d-flex">*/}
                                <ThumbnailCarousel
                                    isCollapsed={isCollapsed}
                                    className="ml-auto" media={itemMediaByRtSbj} />
                            {/*</div>*/}
                        </Col>
                    : null
            }
        </div>
    }
}

export default connect(mapStateToProps)(EventDetailHeader);
