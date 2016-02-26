var React = require('react');

var Ads = React.createClass({

	render: function () {
		return (
		    <div className="ads-right group">
          <a href="http://edx.org" className="edx" >
 						<img src="https://s3.amazonaws.com/goodmoocs-seeds/edx.gif" />
          </a>
          <a href="http://udacity.com" className="udacity" >
            <img src="https://s3.amazonaws.com/goodmoocs-seeds/logo-udacity.png"/>
          </a>
          <a href="http://udemy.com" className="udemy" >
            <img src="https://s3.amazonaws.com/goodmoocs-seeds/udemy.jpg" />
          </a>
          <a href="http://teamtreehouse.com" className="treehouse" >
            <img src="https://s3.amazonaws.com/goodmoocs-seeds/treehouse-logo.png" />
          </a>
        </div>
      )
	}
});

module.exports = Ads