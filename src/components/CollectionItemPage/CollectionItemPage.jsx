import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import './CollectionItemPage.css';

import { getSpoofDataObj } from '../../spoof-data';
import { getItem } from '../../actions/item-actions';
import withScrollNav from '../withScrollNav/withScrollNav';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import { collectionItemsToSingularTitlecased } from '../../utils/parse-data';
import MainNav from '../MainNav/MainNav';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import CollectionItemPageMenu from '../CollectionItemPageMenu/CollectionItemPageMenu';
import CollectionItemHeader from '../CollectionItemHeader/CollectionItemHeader';
import { getQueryVal } from '../../utils/query-string';
import { addItemMenuHeader } from '../../actions/item-menu-headers-actions';
import { config } from '../../store';

const mapDispatchToProps = dispatch => ({
  getItem: (...args) => dispatch(getItem(...args)),
  addItemMenuHeader: (...args) => dispatch(addItemMenuHeader(...args))
})

const mapStateToProps = state => ({
  item: state.item.data,
  isLoading: state.item.isLoading,
  itemError: state.item.error,
  headers: state.itemMenuHeaders
});

function CollectionItemPage(ComposedComponent) {
	class CollectionItemPageContainer extends Component {
		constructor(props) {
			super(props);
		}

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
			console.log('getItem', this.props.shortIdentifier);
			this.props.getItem(
				this.props.collectionItems,
				this.props.shortIdentifier,
				this.filmmakerOptions(this.props.collectionItems)
			);
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
				console.log('adding header', order);
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
				console.log('different shortIdentifier', nextProps.shortIdentifier);
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
			console.log('render CollectionItemPage', item && item.termDisplayName);
			return (
				<div className="CollectionItemPage">
					<ScrollToTopOnMount />
					<div className={isScrollNav ? 'isScrollNav active' : 'isScrollNav'}>
						<MainNav isCollapsed={true} />
					</div>
					{
						item && item.csid ?
						<CollectionItemHeader
							{...item}
							collectionItems={collectionItems} />
						: null
					}
					<div className="container">
						<Row>
							<Col md={3}>
								<CollectionItemPageMenu />
							</Col>
							<Col md={9}>
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
