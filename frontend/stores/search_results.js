var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var _results = {};
var _meta = {};
var SearchResultsStore = new Store(AppDispatcher);
var SearchConstants = require('../constants/search_constants');



SearchResultsStore.all = function () {
  return _searchResults.slice();
};

SearchResultsStore.meta = function () {
  return _meta;
};

SearchResultsStore.__onDispatch = function (payload) {
  switch (payload.actionType) {

    case SearchConstants.RECEIVE_SEARCH_RESULTS:
      _searchResults = payload.searchResults;
      _meta = payload.meta;
      SearchResultsStore.__emitChange();
      break;

  }
};

module.exports = SearchResultsStore;
