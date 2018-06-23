import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import './CollectionItemPage.css';

import { getSpoofDataObj } from '../../spoof-data';
import { getItem } from '../../actions/item-actions';
import withScrollNav from '../withScrollNav/withScrollNav';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import { collectionItemsToSingularTitlecased } from '../../collection-context';
import MainNav from '../MainNav/MainNav';
import CollectionItemPageMenu from '../CollectionItemPageMenu/CollectionItemPageMenu';
import CollectionItemHeader from '../CollectionItemHeader/CollectionItemHeader';
import { getQueryVal } from '../../utils/query-string';
import { addItemMenuHeader } from '../../actions/item-menu-headers-actions';
import { config } from '../../store';

const mapDispatchToProps = dispatch => ({
  getItem: (collectionItems, uri) => dispatch(getItem(collectionItems, uri)),
  addItemMenuHeader: (...args) => dispatch(addItemMenuHeader(...args))
})

const mapStateToProps = state => ({
  item: state.item.data,
  headers: state.itemMenuHeaders
});

function CollectionItemPage(ComposedComponent) {
	class CollectionItemPageContainer extends Component {
		constructor(props) {
			super(props);
		}

		componentDidMount() {
			const uri = config.getRetrieveUri({
				collectionItems: this.props.collectionItems,
				shortIdentifier: this.props.shortIdentifier
			});
			console.log('did mount item page -> get item', uri);
    	this.props.getItem(this.props.collectionItems, uri);
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

		componentDidUpdate(nextProps) {
			if (nextProps.shortIdentifier !== this.props.shortIdentifier) {
				// new item, scroll back to top and reset headers
				window.scrollTo(0, 0);
			}
		}

		state = {
			viewMode: getQueryVal(window.location.search, 'view') || 'grid',
		}

		setViewMode = viewMode => {
			// this.setState({
			// 	viewMode
			// });
		}

		render() {
			const { collectionItems, item, shortIdentifier, isScrollNav } = this.props;
			const { viewMode } = this.state;
			// const item = getSpoofDataObj(collectionItems, itemId);
			// if (!item) {
			// 	throw new Error('Item with ID ' + itemId + ' in ' + collectionItems + ' not found. TODO: 404 page!');
			// }
			const singularItemForm = collectionItemsToSingularTitlecased(collectionItems);
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
										item && item.csid ?
										<ComposedComponent
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
