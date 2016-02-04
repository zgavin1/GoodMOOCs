var SearchActions = require('../actions/search_actions');

var SearchApiUtil = {
  search: function (query, page) {
    $.ajax({
      url: '/api/search',
      type: 'GET',
      dataType: 'json',
      data: {query: query, page: page},
      success: function (data) {
        SearchActions.receiveResults(data);
      }
    });
  },

  searchAndRedirect: function (query, page, callback) {
    $.ajax({
      url: '/api/search',
      type: 'GET',
      dataType: 'json',
      data: {query: query, page: page},
      success: function (data) {
        SearchActions.receiveResults(data);
        callback && callback();
      }
    });
  }
};


module.exports = SearchApiUtil;
