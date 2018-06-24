import { combineReducers } from 'redux';
import filmmakers from './filmmakers-reducer';
import films from './films-reducer';
import item from './item-reducer';
import items from './items-reducer';
import itemMenuHeaders from './item-menu-headers-reducer';
import collectionSort from './collection-sort-reducer';

export default combineReducers({
  filmmakers,
  films,
  item,
  itemMenuHeaders,
  items,
  collectionSort
});