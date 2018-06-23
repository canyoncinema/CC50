import React, { Component} from 'react';
import { connect } from 'react-redux';
import CollectionSort from '../CollectionSort/CollectionSort';
import CollectionContext, { toCollectionSearchLabel, collectionItemsToSingular } from '../../collection-context';
import { getItems } from '../../actions/items-actions';

import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import CollectionSection from '../CollectionSection/CollectionSection';
import { getSpoofDataList } from '../../spoof-data';

const mapDispatchToProps = dispatch => ({
  getItems: (...args) => dispatch(getItems(...args))
});

const mapStateToProps = state => ({
  items: state.items.data,
  sortIsOpen: state.collectionSort.isOpen,
  sortVal: state.collectionSort.activeOption.value
});

class CollectionPageItems extends Component {
	componentDidMount() {
    this.props.getItems(this.props.collectionItems, this.props.sortVal);
  }

  componentDidUpdate(nextProps) {
  	console.log('componentDidUpdate', nextProps.collectionItems, this.props.collectionItems)
  	if (nextProps.collectionItems !== this.props.collectionItems) {
  		// change items shown
  		this.props.getItems(nextProps.collectionItems, this.props.sortVal);
  	}
  }

  componentWillUnmount() {
  	console.log('unmounting CollectionPageItems')
  }

	render() {
		const { items, collectionItems, viewMode } = this.props;
		return <CollectionContext.Consumer>
			{
				context => 
				<div className="CollectionPageItem">
					<ScrollToTopOnMount />
					{	!context.searchedText ?
						<CollectionSort
							collectionItems={collectionItems}
							itemLabel={toCollectionSearchLabel(collectionItems)} />
						: null
					}
					<CollectionSection
						itemType={collectionItemsToSingular(collectionItems)}
						viewMode={viewMode} 
						searchData={items}/>
				</div>
			}
		</CollectionContext.Consumer>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPageItems);