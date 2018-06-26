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

  componentWillReceiveProps(nextProps) {
  	if (nextProps.collectionItems !== this.props.collectionItems ||
  			nextProps.sortVal !== this.props.sortVal) {
  		// change items shown
  		this.props.getItems(nextProps.collectionItems, nextProps.sortVal);
  	}
  }

	render() {
		const { items, collectionItems, viewMode } = this.props;
		return <CollectionContext.Consumer>
			{
				context => 
				<div className="CollectionPageItems">
					<ScrollToTopOnMount />
					{	!context.searchedText ?
						<CollectionSort
							collectionItems={collectionItems}
							itemLabel={toCollectionSearchLabel(collectionItems)} />
						: null
					}
					<CollectionSection
						customColSize={viewMode !== 'list' ? 4 : null}
						customColWidth="sm"
						itemType={collectionItemsToSingular(collectionItems)}
						viewMode={viewMode} 
						searchData={items}/>
				</div>
			}
		</CollectionContext.Consumer>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPageItems);