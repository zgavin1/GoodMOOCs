var React = require('react');
var UsersApiUtil = require('./../../util/user_api_util');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserStore = require('./../../stores/user');


var EditUserForm = React.createClass({
  mixins: [History, LinkedStateMixin],

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this.onChange);
    UsersApiUtil.fetchUser(this.props.params.id);
  },

  onChange: function () {
    this.setState(this.getStateFromStore());
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  getStateFromStore: function () {
    var user = UserStore.findUserById(parseInt(this.props.params.id));
    return user || {};
  },

  onSubmit: function (e) {
    e.preventDefault();
    var user_params = { user: this.state };
    var formData = new FormData();

    formData.append("user[avatar]", this.state.avatarFile);
    formData.append("user[username]", this.state.username);
    formData.append("user[email]", this.state.email);
    formData.append("user[id]", this.state.id);

    UsersApiUtil.updateUser(formData, this.state.id, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  changeFile: function(e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({avatarFile: file, avatar: reader.result});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file); // will trigger a load end event when it completes, and invoke reader.onloadend
    } else {
      this.setState({avatarFile: null, avatar: ""});
    }
  },

	render: function () {
    var user = this.state;
    if (!user) {
      return <div></div>;
    }
// Need to include updating user avatar
		return (

      <div className="edit-user-page group">
        <div className="edit-user-header group">
          <h1>Account Settings</h1>
          <h2><a href={"#/users/"+ user.id}>View Profile</a></h2>
        </div>
        <div className="edit-user-nav group">
          <h3 className="edit-user-nav-option">Profile</h3>
          <h3 className="edit-user-nav-option">Other</h3>
          <h3 className="edit-user-nav-option">Option</h3>
          <h3 className="edit-user-nav-option">Other</h3>
          <h3 className="edit-user-nav-option">Option</h3>
        </div>
        <div className="edit-user-form-pane group">

          <form className="edit-user-form" onSubmit={this.onSubmit}>
            <div className="edit-user-avatar">
              <img className="preview-image" src={this.state.avatar}/>
              <br></br>
              <label>
                <input className="file-input" type="file" onChange={this.changeFile} />
              </label>
            </div>
            <div className="user-form-field">
              <label> Name <br/>
                <input className="user-form-input" type="text" valueLink={this.linkState('username')} />
              </label>
            </div>
            <div className="user-form-field">
              <label> Email Address <br/>
                <input className="user-form-input" type="text" valueLink={this.linkState('email')} />
              </label>
            </div>
            <button className="edit-user-form-submit" >Save Profile Settings</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = EditUserForm;
