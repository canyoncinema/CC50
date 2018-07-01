import React, { Component} from 'react';
import { connect } from 'react-redux';
import CollectionSort from '../CollectionSort/CollectionSort';
import CollectionContext, { toCollectionSearchLabel, collectionItemsToSingular } from '../../collection-context';
import { getItems } from '../../actions/items-actions';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import CollectionSection from '../CollectionSection/CollectionSection';
import { collectionItemsToSingularTitlecased } from '../../utils/parse-data';
import { Helmet } from 'react-helmet';

const mapDispatchToProps = dispatch => ({
  getItems: (...args) => dispatch(getItems(...args))
});

const mapStateToProps = state => ({
  items: state.items.data,
  isLoading: state.items.isLoading,
  error: state.items.error,
  sortIsOpen: state.collectionSort.isOpen,
  sortVal: state.collectionSort.activeOption.value
});

class CollectionPageItems extends Component {
	componentDidMount() {
    this.props.getItems(this.props.collectionItems, this.props.sortVal);
  }

  componentWillReceiveProps(nextProps) {
  	if (nextProps.collectionItems !== this.props.collectionItems ||
  			nextProps.sortVal !== this.props.sortVal) {
  		// change items shown
  		this.props.getItems(nextProps.collectionItems, nextProps.sortVal);
  	}
  }

	render() {
		const { items, isLoading, error, collectionItems, viewMode } = this.props;
		return <CollectionContext.Consumer>
			{
				context => 
				<div className="CollectionPageItems">
					<Helmet>
		        <title>{collectionItems ? toCollectionSearchLabel(collectionItems) : 'CC50'} | Canyon Cinema</title>
		      </Helmet>
					<ScrollToTopOnMount />
					{
						error ?
						<ErrorMessage />
						: isLoading?
						<LoadingMessage />
						: null
					}
					{	!isLoading && !error && !context.searchedItemsSearchedText ?
						<CollectionSort
							collectionItems={collectionItems}
							itemLabel={toCollectionSearchLabel(collectionItems)} />
						: null
					}
					{
						!isLoading && !error ?
						<CollectionSection
							customColSize={viewMode !== 'list' ? 4 : null}
							customColWidth="sm"
							itemType={collectionItemsToSingular(collectionItems)}
							viewMode={viewMode} 
							searchData={items}/>
						: null
					}
				</div>
			}
		</CollectionContext.Consumer>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPageItems);