import { combineReducers } from 'redux';
import filmmakers from './filmmakers-reducer';
import films from './films-reducer';
import item from './item-reducer';
import items from './items-reducer';
import itemMenuHeaders from './item-menu-headers-reducer';
import collectionSort from './collection-sort-reducer';
import typeAheadChoices from './typeahead-choices-reducer';
import events from './events-reducer';
import eventDetail from './event-detail-reducer';
import news from './news-reducer';
import newsDetail from './news-detail-reducer';
import posts from './posts-reducer';
import programs from './programs-reducer';
import ephemera from './ephemera-reducer';
import spotlight from './spotlight-reducer';
import itemsMedia from './items-media-reducer';
import filmmakersMedia from './filmmakers-media-reducer';
import searchedItems from './searched-items-reducer';
import fullSizedCarousel from './full-sized-carousel-reducer';

export default combineReducers({
  filmmakers,
  films,
  item,
  itemMenuHeaders,
  items,
  collectionSort,
  typeAheadChoices,
  events,
  eventDetail,
  news,
  newsDetail,
  posts,
  programs,
  ephemera,
  spotlight,
  itemsMedia,
  filmmakersMedia,
  searchedItems,
  fullSizedCarousel
});