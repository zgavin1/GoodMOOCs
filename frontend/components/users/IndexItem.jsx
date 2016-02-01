var React = require('react');
var ReactRouter = require('react-router');

var UserIndexItem = React.createClass({
  // mixins: [ReactRouter.history],
  componentWillReceiveProps: function (newProps) {
    this.forceUpdate();
  },


//Render for front page, just image links

  render: function () {
    var user = this.props.user;
    return (
      <li
        className="user-index-item-link"
        onClick={this.props.clickFunction} >
        <a href={ "#/users/" + user.id }>
          <h2>{user.username}</h2>
        </a>

        <img src={ user.avatar }/>

      </li>
    );
  }

});

module.exports = UserIndexItem;
