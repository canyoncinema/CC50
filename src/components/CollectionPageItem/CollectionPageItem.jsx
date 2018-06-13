import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './CollectionPageItem.css';

import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import { getSpoofDataObj } from '../../spoof-data';
import { collectionItemsToSingularTitlecased } from '../../collection-context';
import MainNav from '../MainNav/MainNav';
import withScrollNav from '../withScrollNav/withScrollNav';
import CollectionPageItemMenu from '../CollectionPageItemMenu/CollectionPageItemMenu';
import Button from '../Button/Button';
import SearchCards from '../SearchCards/SearchCards';
import EphemeraMiniCard from '../EphemeraMiniCard/EphemeraMiniCard';
import EventTile from '../EventTile/EventTile';
import NewsTile from '../NewsTile/NewsTile';
import RentThis from '../RentThis/RentThis';
import ViewModeToggler from '../ViewModeToggler/ViewModeToggler';
import CollectionItemHeader from '../CollectionItemHeader/CollectionItemHeader';
import { getQueryVal } from '../../utils/query-string';

function conditionalHeaderedContent(headers, condition, headerVal) {
	if (condition) {
		headers.push(headerVal);
	}
}

class CollectionPageItem extends Component {
	constructor(props) {
		super(props);
		this.headers = [];
	}

	conditionallyShow = ({ condition, menuHeader, renderHeader, renderContent, omitSectionWrapper }) => {
		// note: renderHeader gets rendered over menuHeader, while menuHeader is added to this.headers
		// for side menu rendering
		if (!renderContent) {
			throw new Error('Expected renderContent');
		}
		if (condition) {
			if (menuHeader) this.headers.push(menuHeader);
			const id = menuHeader ? 'section-' + (this.headers.length - 1) : null;
			return !omitSectionWrapper ?
			(
				<section id={id}>
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
					<h3 id={id} key={0}>{menuHeader}</h3>
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

	render() {
		this.headers = []; // reset
		const { collectionItems, itemId, isScrollNav } = this.props;
		const { viewMode } = this.state;
		const item = getSpoofDataObj(collectionItems, itemId);
		const singularItemForm = collectionItemsToSingularTitlecased(collectionItems);
		return (
			<div className="CollectionPageItem">
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
							<CollectionPageItemMenu
								headers={this.headers}
							/>
						</Col>
						<Col xs={9}>
							<div className="content">
								{this.conditionallyShow({
									condition: !!item.description,
									menuHeader: 'About the ' + singularItemForm,
									renderContent: () => (
										<pre className="rich-text">
											{item.description}
										</pre>
									)
								})}
								{this.conditionallyShow({
									condition: singularItemForm === 'Program' &&
										item.films &&
										item.films.length,
									menuHeader: 'Films in This ' + singularItemForm,
									renderContent: () => (
										<SearchCards
											viewMode="list"
											customColSize={12}
											data={item.films}
										/>
									)
								})}
								{this.conditionallyShow({
									condition: singularItemForm === 'Filmmaker' &&
										item.films &&
										item.films.length,
									menuHeader: 'Films by This ' + singularItemForm,
									renderContent: () => (
										<SearchCards
											viewMode="list"
											customColSize={12}
											data={item.films}
										/>
									)
								})}
								{this.conditionallyShow({
									condition: singularItemForm === 'Program' &&
										item.filmmakers &&
										item.filmmakers.length,
									menuHeader: 'Filmmakers in This ' + singularItemForm,
									renderContent: () => (
										<SearchCards
											viewMode="list"
											customColSize={12}
											data={item.filmmakers}
										/>
									)
								})}
								{this.conditionallyShow({
									condition: item.ephemera && item.ephemera.length,
									menuHeader: 'Ephemera',
									renderHeader: () => <h3>{'Ephemera Related to This ' + singularItemForm}</h3>,
									renderContent: () => (
										item.ephemera.map((e, i) =>
											<EphemeraMiniCard
												key={i}
												{...e}
											/>
										)
									)
								})}
								{this.conditionallyShow({
									condition: item.programs && item.programs.length,
									menuHeader: 'Programs',
									renderHeader: () => <h3>{'Curated Programs Featuring this ' + singularItemForm}</h3>,
									renderContent: () => (
										item.programs.map((program, i) =>
											<SearchCards
												key={i}
												viewMode="grid"
												customColSize={6}
												data={program}
											/>
										)
									)
								})}
								{this.conditionallyShow({
									condition: singularItemForm === 'Filmmaker' &&
										item.filmmakers &&
										item.filmmakers.length,
									menuHeader: 'Related Filmmakers',
									renderContent: () => (
										<SearchCards
											viewMode="list"
											customColSize={12}
											data={item.filmmakers}
										/>
									)
								})}
								{this.conditionallyShow({
									condition: item.events && item.events.length,
									menuHeader: 'Events',
									renderHeader: () => <h3>{'Events Featuring This ' + singularItemForm}</h3>,
									renderContent: () => (
										item.events.map((e, i) =>
											<EventTile
												key={i}
												{...e}
											/>
										)
									)
								})}
								{this.conditionallyShow({
									condition: item.news && item.news.length,
									menuHeader: 'Events',
									renderHeader: () => <h3>{'News Featuring This ' + singularItemForm}</h3>,
									renderContent: () => (
										item.events.map((e, i) =>
											<Col sm={6}>
												<NewsTile
													key={i}
													{...e}
												/>
											</Col>
										)
									)
								})}
								{this.conditionallyShow({
									condition: item.rentalFormats && item.rentalFormats.length,
									renderHeader: () => (
										<Button style="default">
											{'Rent This ' + singularItemForm}
										</Button>
									),
									renderContent: () => (
										<RentThis />
									)
								})}
								{this.conditionallyShow({
									condition: item.filmmaker && !!item.filmmaker.description,
									menuHeader: 'About the Filmmaker',
									renderContent: () => (
										<pre className="rich-text">
											{item.filmmaker.description}
										</pre>
									)
								})}
								{this.conditionallyShow({
									condition: !!item.filmmaker,
									menuHeader: null,
									renderContent: () => (
										<Link to={'/collection/filmmakers/' + item.filmmaker.id}>
											<Button key={1} style="default">
												View Filmmaker Profile
											</Button>
										</Link>
									),
									omitSectionWrapper: true
								})}
								{this.conditionallyShow({
									condition: item.filmmaker && item.filmmaker.films && item.filmmaker.films.length > 1,
									menuHeader: 'Other Films by this Filmmaker',
									renderHeader: () => <header className="d-flex">
										<h3 className="single-line-ellipsed">
											{'Other Films by ' + item.filmmaker.title}
										</h3>
										<span className="ml-auto">
											<ViewModeToggler
												activeMode={viewMode || 'list'}
												onClick={this.setViewMode}
												theme="dark" />
										</span>
									</header>,
									renderContent: () => (
										<div className="container no-padding">
											<SearchCards
												viewMode={viewMode}
												customColSize={6}
												data={item.filmmaker.films.filter(f => f.id !== item.id)} />
										</div>
									)
								})}
							</div>
						</Col>
					</Row>
				</div>
			</div>
		);
	}

	setViewMode = viewMode => {
		this.setState({
			viewMode
		});
	}
}

export default withScrollNav(CollectionPageItem);