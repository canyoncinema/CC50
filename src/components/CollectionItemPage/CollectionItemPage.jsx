import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './CollectionItemPage.css';

import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import { getSpoofDataObj } from '../../spoof-data';
import { collectionItemsToSingularTitlecased } from '../../collection-context';
import MainNav from '../MainNav/MainNav';
import CollectionItemPageMenu from '../CollectionItemPageMenu/CollectionItemPageMenu';
import CollectionItemHeader from '../CollectionItemHeader/CollectionItemHeader';
import { getQueryVal } from '../../utils/query-string';

function CollectionItemPage(ComposedComponent) {
	return class extends Component {
		constructor(props) {
			super(props);
			this.headers = [];
		}

		state = {
			headersInitialized: false
		}

		componentDidMount() {
			this.setState({
				headersInitialized: true
			});
		}

		conditionallyShow = ({ id, condition, menuHeader, renderHeader, renderContent, omitSectionWrapper }) => {
			// note: renderHeader gets rendered over menuHeader, while menuHeader is added to this.headers
			// for side menu rendering
			if (!renderContent) {
				throw new Error('Expected renderContent');
			}
			if (condition) {
				if (menuHeader && !this.state.headersInitialized) {
					this.headers.push({ content: menuHeader, id });
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
		}
		componentDidUpdate(nextProps) {
			if (nextProps.itemId !== this.props.itemId) {
				// new item, scroll back to top
				window.scrollTo(0, 0);
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
			const { collectionItems, itemId, isScrollNav } = this.props;
			const { viewMode, headersInitialized } = this.state;
			const item = getSpoofDataObj(collectionItems, itemId);
			const singularItemForm = collectionItemsToSingularTitlecased(collectionItems);
			return (
				<div className="CollectionItemPage">
					<ScrollToTopOnMount />
					<div className={isScrollNav ? 'isScrollNav active' : 'isScrollNav'}>
						<MainNav isCollapsed={true} />
					</div>
					<CollectionItemHeader
						{...item}
						collectionItems={collectionItems} />
					<div className="container">
						<Row>
							<Col xs={3}>
								<CollectionItemPageMenu
									headers={this.headers}
									headersInitialized={headersInitialized}
								/>
							</Col>
							<Col xs={9}>
								<div className="content">
									<ComposedComponent
										viewMode={viewMode}
										setViewMode={this.setViewMode}
										item={item}
										conditionallyShow={this.conditionallyShow}
										singularItemForm={singularItemForm} />
								</div>
							</Col>
						</Row>
					</div>
				</div>
			);
		}
	}
}

export default CollectionItemPage;