import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import './CollectionItemPage.css';

import { Helmet } from 'react-helmet';
import { getSpoofDataObj } from '../../spoof-data';
import { getItem, removeItem, setItemData } from '../../actions/item-actions';
import withScrollNav from '../withScrollNav/withScrollNav';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import { collectionItemsToSingularTitlecased } from '../../utils/parse-data';
import MainNav from '../MainNav/MainNav';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import CollectionItemPageMenu from '../CollectionItemPageMenu/CollectionItemPageMenu';
import CollectionItemHeader from '../CollectionItemHeader/CollectionItemHeader';
import { getQueryVal } from '../../utils/query-string';
import {addItemMenuHeader, resetItemMenuHeaders} from '../../actions/item-menu-headers-actions';
import { config } from '../../store';
import { ephemeraData } from '../../spoof-data';

const mapDispatchToProps = dispatch => ({
  getItem: (...args) => dispatch(getItem(...args)),
  removeItem: (...args) => dispatch(removeItem(...args)),
  setItemData: (...args) => dispatch(setItemData(...args)),
  addItemMenuHeader: (...args) => dispatch(addItemMenuHeader(...args)),
  resetItemMenuHeaders: (...args) => dispatch(resetItemMenuHeaders())
})

const mapStateToProps = state => ({
  item: state.item.data,
  isLoading: state.item.isLoading,
  itemError: state.item.error,
  headers: state.itemMenuHeaders
});

function CollectionItemPage(ComposedComponent) {
	class CollectionItemPageContainer extends Component {
		filmmakerOptions(collectionItems) {
			let filmmakerOptions;
			if (this.props.collectionItems === 'films') {
				// SPEC: on a film page, show 6 films initially by filmmaker
				// on a filmmaker page, show 20 initially
				filmmakerOptions = {
					filmsByFilmmakerPgSz: this.props.collectionItems === 'films' ? 6 : 20
				};
			}
			return filmmakerOptions;
		}

		componentDidMount() {
            this.props.resetItemMenuHeaders();
			if (this.props.collectionItems === 'ephemera') {
			// TODO: UNHACK -- we do not want to get items for ephemera (not yet ready)
				this.props.setItemData(
					this.props.collectionItems,
					ephemeraData,
					this.props.shortIdentifier
				);
				return;
			}

			this.props.getItem(
				this.props.collectionItems,
				this.props.shortIdentifier,
				this.filmmakerOptions(this.props.collectionItems)
			);
		}

		componentWillUnmount() {
			this.props.removeItem();
		}

		conditionallyShow = ({
			id,
			order,
			condition,
			menuHeader,
			renderHeader,
			renderContent,
			omitSectionWrapper
		}) => {
			// note: renderHeader gets rendered over menuHeader, while menuHeader is added to headers
			// for side menu rendering
            if (!condition) return;
			if (!renderContent) {
				throw new Error('Expected renderContent');
			}
			if (menuHeader && !this.props.headers[order]) {
				// new addition to headers
				const header = { content: menuHeader, id };
				this.props.addItemMenuHeader(order, header);
			}
			id = menuHeader ? id : null;
			return !omitSectionWrapper ?
			(
				<section key={id} id={id}>
					{
						renderHeader ?
						React.cloneElement(renderHeader(), {
							id
						})
						: menuHeader ?
						<h3>{menuHeader}</h3>
						: null
					}
					{ renderContent() }
				</section>
			) :
			[
				renderHeader ?
					React.cloneElement(renderHeader(), {
						id,
						key: 0
					})
					: menuHeader ?
					<h3 key={id} id={id} key={0}>{menuHeader}</h3>
					: null
				,
				React.cloneElement(renderContent(), {
					key: 1
				})
			]
		}

		componentWillReceiveProps(nextProps) {
			if (nextProps.shortIdentifier !== this.props.shortIdentifier) {
                // new item, scroll back to top and reset headers
				window.scrollTo(0, 0);
				this.props.getItem(
					nextProps.collectionItems,
					nextProps.shortIdentifier,
					this.filmmakerOptions(nextProps.collectionItems)
				);
			}
		}

		state = {
			viewMode: getQueryVal(window.location.search, 'view') || 'grid',
		}

		setViewMode = viewMode => {
			this.setState({
				viewMode
			});
		}

		render() {
			const { collectionItems, isLoading, itemError, item, shortIdentifier, isScrollNav } = this.props;
			const viewMode = getQueryVal(window.location.search, 'view') || 'grid';
			// const item = getSpoofDataObj(collectionItems, itemId);
			// if (!item) {
			// 	throw new Error('Item with ID ' + itemId + ' in ' + collectionItems + ' not found. TODO: 404 page!');
			// }
			const singularItemForm = collectionItemsToSingularTitlecased(collectionItems);
			return (
				<div className="CollectionItemPage">
					<Helmet>
		        <title>{item ? item.termDisplayName : 'CC50'} | Canyon Cinema</title>
		      </Helmet>
					<ScrollToTopOnMount />
					<div className={isScrollNav ? 'isScrollNav active' : 'isScrollNav'}>
						<MainNav
							includesCollapsedItemPageNav={true}
							isCollapsed={true} />
					</div>
					{
						item ?
						<CollectionItemHeader
						{...item}
						collectionItems={collectionItems} />
						: null
					}
					<div className="container">
						<Row>
							{
								collectionItems !== 'ephemera' ?
								<Col md={3}>
									<CollectionItemPageMenu />
								</Col>
								: null
							}
							<Col md={collectionItems !== 'ephemera' ? 9 : 12}>
								<div className="descriptive-content">
									{
										isLoading ?
										<LoadingMessage />
										: itemError ?
										<ErrorMessage />
										: null
									}
									{
										!isLoading && item && item.csid ?
										<ComposedComponent
											item={item}
											viewMode={viewMode}
											shortIdentifier={shortIdentifier}
											setViewMode={this.setViewMode}
											conditionallyShow={this.conditionallyShow}
											singularItemForm={singularItemForm} />
										: null
									}
								</div>
							</Col>
						</Row>
					</div>
				</div>
			);
		}
	}
	return withScrollNav(connect(mapStateToProps, mapDispatchToProps)(CollectionItemPageContainer));
}

export default CollectionItemPage;
