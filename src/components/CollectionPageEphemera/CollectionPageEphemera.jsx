import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
// import './NewsPage.css';
import { getGhostContent, appendGhostContent } from '../../actions/ghost-actions';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import PageHeader from '../PageHeader/PageHeader';
import NewsTile from '../NewsTile/NewsTile';
import EphemeraMiniCard from '../EphemeraMiniCard/EphemeraMiniCard'
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import InfiniteScroll from "react-infinite-scroller";
import throttle from '../../utils/throttle';


const mapStateToProps = state => ({
    ephemera: state.ghostContent.ephemera,
    ephemeraPageNum: state.ghostContent.pageNum || 1,
    finalPage: state.ghostContent.totalPages,
    isLoading: state.ghostContent.isLoading,
    error: state.ghostContent.error
});

const mapDispatchToProps = dispatch => ({
    getGhostContent: (...args) => dispatch(getGhostContent(...args)),
    appendGhostContent: (...args) => dispatch(appendGhostContent(...args))
});



class CollectionPageEphemera extends Component {
    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
        this.isLoadingMore = false;
    }

    paginate = () => {
        const { ephemeraPageNum } = this.props;
        const page = ephemeraPageNum + 1;
        console.log('ephemera paginate', page, this.props.ephemera);
        return this.props.appendGhostContent({
            limit: 3,
            type: 'ephemera',
            page: page
        });
    }

    loadMore() {
        if (!this.paginate) return;
        if (this.isLoadingMore) {
            return;
        }
        this.isLoadingMore = true;
        this.paginate().then(() => {
            this.isLoadingMore = false;
        });
    }

    throttledLoadMore = throttle(this.loadMore.bind(this), 1000)

    componentDidUpdate(prevProps) {
        // TODO: bidirectional scroll
        if (prevProps.ephemeraPageNum !== this.props.ephemeraPageNum) {
            this.isLoadingMore = false;
        }
    }

    componentDidMount() {
        this.props.getGhostContent({
            limit: 3,
            type: 'ephemera',
            page: 1
        });
    }

    render() {
        const { ephemera, ephemeraPageNum, finalPage, isLoading, error } = this.props;
        return (
            <div className="NewsPage">
                <ScrollToTopOnMount />
                <PageHeader headline="Ephemera" />
                <div className="container content">
                    <Row>
                        <Col sm={12}>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        {
                            isLoading &&
                            <LoadingMessage />
                        }
                        {
                            error &&
                            <ErrorMessage />
                        }

                        {
                            ephemera &&

                            <InfiniteScroll
                                pageStart={0}
                                className="row SearchCards"
                                loadMore={this.throttledLoadMore}
                                hasMore={
                                    this.paginate &&
                                    finalPage &&
                                    ephemeraPageNum < finalPage
                                }
                                useWindow={true}
                                threshold={500}
                                loader={<LoadingMessage className="paginate-loader" key={-1}/>}
                            >

                                {

                                    ephemera.map((d, i) => {
                                        return (
                                            <Col sm={4} key={i}>
                                                <NewsTile {...d} key={i} linkBase="/collection/ephemera"/>
                                            </Col>
                                        );
                                    })
                                }
                            </InfiniteScroll>
                        }

                    </Row>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPageEphemera);
