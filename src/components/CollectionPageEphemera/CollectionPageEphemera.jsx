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
import Search from "../Search/Search";
import CollectionContext, { toCollectionSearchLabel } from '../../collection-context';
import ViewModeToggler from "../ViewModeToggler/ViewModeToggler";
import {withRouter} from "react-router-dom";
import withScrollNav from "../withScrollNav/withScrollNav";


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

    state = {
        onOptionSelect: option => {
            if (this.props.searchedText) {
                this.submitSearch(this.props.searchedText, option.collectionItems);
            } else {
                // just push to history
                const path = '/collection' + (option.collectionItems ? '/' + option.collectionItems : '');
                this.props.history.push(path);
            }
        }
    }

    render() {
        const { ephemera, ephemeraPageNum, finalPage, isLoading, error } = this.props;
        return (
            <CollectionContext.Provider value={this.state}>

            <div className="NewsPage CollectionPage">
                <ScrollToTopOnMount />
                {/*<PageHeader headline="Ephemera" />*/}
                <header className="search-sort">
                    <div className="container">
                        <h1 className="white">Explore the collection</h1>
                        <div className="filters">
                            <Search id={0} collectionItems={"Ephemera"} />
                            <ViewModeToggler
                                activeMode={'grid'}
                                onClick={this.setViewMode} />
                        </div>
                    </div>
                </header>
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
            </CollectionContext.Provider>
        );
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(CollectionPageEphemera);

export default withRouter(withScrollNav(connect(mapStateToProps, mapDispatchToProps)(CollectionPageEphemera)))
