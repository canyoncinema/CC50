import React, { Component} from 'react';
import { connect } from 'react-redux';
import CollectionSort from '../CollectionSort/CollectionSort';
import CollectionContext, { toCollectionSearchLabel, collectionItemsToSingular } from '../../collection-context';
import { getItems, appendItems } from '../../actions/items-actions';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import CollectionSection from '../CollectionSection/CollectionSection';
import { collectionItemsToSingularTitlecased } from '../../utils/parse-data';
import { Helmet } from 'react-helmet';
import throttle from '../../utils/throttle';

const mapDispatchToProps = dispatch => ({
  getItems: (...args) => dispatch(getItems(...args)),
  appendItems: (...args) => dispatch(appendItems(...args))
});

const mapStateToProps = state => ({
  items: state.items.data,
  itemsPageNum: state.items.pageNum || 0,
  totalCount: state.items.totalCount,
  isLoading: state.items.isLoading,
  error: state.items.error,
  sortIsOpen: state.collectionSort.isOpen,
  sortVal: state.collectionSort.activeOption.value
});

const PAGE_COUNT = 39;

class CollectionPageItems extends Component {
	paginate = () => {
		const { itemsPageNum } = this.props;
		const page = itemsPageNum + 1;
		console.log('paginate', page, itemsPageNum);
	  return this.props.appendItems(
	 	  this.props.collectionItems,
	 	  {
	  		pgSz: PAGE_COUNT
	  	},
	  	page,
	  );
		// return Promise.resolve();
	}

	componentDidMount() {
    this.props.getItems(this.props.collectionItems, { pgSz: PAGE_COUNT });
  }

  componentWillReceiveProps(nextProps) {
  	if (nextProps.collectionItems !== this.props.collectionItems ||
  			nextProps.sortVal !== this.props.sortVal) {
  		// change items shown
  		this.props.getItems(nextProps.collectionItems, { pgSz: PAGE_COUNT });
  		if (window) window.scrollTo(0, 0);
  	}
  }

	render() {
		const {
			items, totalCount, pageCount,
			isLoading, error, collectionItems, viewMode
		} = this.props;
		// TODO: reinstitute working sort
		return <CollectionContext.Consumer>
			{
				context => 
				<div className="CollectionPageItems">
					<Helmet>
		        <title>{collectionItems ? toCollectionSearchLabel(collectionItems) : 'CC50'} | Canyon Cinema</title>
		      </Helmet>
		      <ScrollToTopOnMount />
					{ error && <ErrorMessage /> }
					{/*{	!isLoading && !error && !context.searchedItemsSearchedText &&*/}
						{/*<CollectionSort*/}
							{/*collectionItems={collectionItems}*/}
							{/*itemLabel={toCollectionSearchLabel(collectionItems)} />*/}
					{/*}*/}
					{
						!isLoading && !error &&
						<CollectionSection
							id="scrollable-items"
							customColSize={viewMode !== 'list' ? 4 : null}
							customColWidth="sm"
							itemType={collectionItemsToSingular(collectionItems)}
							viewMode={viewMode} 
							searchData={items}
							searchTotalCount={totalCount}
							paginate={throttle(this.paginate, 1000)}
						/>
					}
				</div>
			}
		</CollectionContext.Consumer>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPageItems);