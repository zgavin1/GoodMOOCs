var React = require('react');


var UserShow = React.createClass({
  render: function () {
    var user = this.props.user;

    return (
      <div>
        <h2>{user.username}</h2>
        <img src={user.avatar}/>
      </div>
    );
  }

});

module.exports = UserShow;
