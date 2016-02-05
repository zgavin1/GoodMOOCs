var React = require('react');
var SearchResultsStore = require('../stores/search_results');
var SearchApiUtil = require('./../util/search_api_util');

var UserIndexItem = require('./users/IndexItem');
var CourseIndexItem = require('./course/CourseIndexItem');

var LinkedStateMixin = require('react-addons-linked-state-mixin');


var Search = React.createClass({
  mixins: [LinkedStateMixin],

  componentDidMount: function() {
    this.listener = SearchResultsStore.addListener(this._onChange);
    
  },

  getInitialState: function () {
    return { page: 1, query: this.props.location.state.query || "" };
  },

  _onChange: function() {
    this.forceUpdate();
  },

  search: function (e) {
    var query = e.target.value;
    SearchApiUtil.search(query, 1);

    this.setState({page: 1, query: query});
  },

  nextPage: function () {
    var nextPage = this.state.page + 1;
    SearchApiUtil.search(this.state.query, nextPage);

    this.setState({page: nextPage});
  },

  lastPage: function () {
    var lastPage = this.state.page - 1;
    SearchApiUtil.search(this.state.query, lastPage);

    this.setState({page: lastPage});
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  render: function() {

    var searchResults = SearchResultsStore.all().map(function (searchResult) {
      if (searchResult._type === "User") {
        return <UserIndexItem key={searchResult.id} user={searchResult} className="search-result"/>;
      } else {
        return <CourseIndexItem key={searchResult.id} course={searchResult} className="search-result"/>;
      }
    });

    return (
      <div className="search-content group">
        <h1 className="search-title">Search</h1>
        <input
          type="text"
          className="search-page-input"
          placeholder="Search by Course or User"
          onKeyUp={ this.search }
          valueLink={this.linkState('query')}/>
        <p className="page-count">
          Displaying {SearchResultsStore.all().length} of
          {" "+ (SearchResultsStore.meta().totalCount || "0")}
        </p>
        <ul className="search-index group">{ searchResults }</ul>
        <button className="search-page-decrement" onClick={this.lastPage}>{"< Back"}</button>
        <button className="search-page-increment" onClick={this.nextPage}>{"Next >"}</button>
      </div>
    );
  },


});

module.exports = Search;
