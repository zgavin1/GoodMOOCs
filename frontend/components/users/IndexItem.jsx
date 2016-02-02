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
      <li className={this.props.className + " group"} >
        <img className="user-img" src={ user.avatar }/>
        <h2 className="user-index-item-name">
          <a className="user-name-container" href={ "#/users/" + user.id }>
            {user.username}
          </a>
        </h2>
        <p> More info about the user can go here. </p>

      </li>
    );
  }

});

module.exports = UserIndexItem;
