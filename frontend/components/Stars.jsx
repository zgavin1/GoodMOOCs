var React = require('react');
var ReactDOM = require('react-dom');

var CourseStore = require('./../stores/course');

var Stars = React.createClass({
	// expecting props about how many should be highlight
	// 
	// expecting props about whether its static or can change
	//  // if it can change, need to store state based
	//  // on how many stars currently highlighted
	//  // Also, if it can change, should respond to a click
	getInitialState: function () {
		// if (this.props.static) {
			return {
				rating: this.props.rating || 0
			};
		// }

	},

	componentDidMount: function () {
		this.courseListener = CourseStore.addListener(this.forceUpdate.bind(this));
	},

	componentWillUnmount: function () {
		this.courseListener.remove();
	},

	componentWillReceiveProps: function () {
		this.forceUpdate();
	},

	changeRating: function () {
		// probably open the review create/edit form
		// with this.state.rating prepended
		if (!this.props.handleStarClick) {
			return;
		}

		this.props.handleStarClick(this.state.rating);
	},

	handleMouseOver: function (e) {
		// how to get rating from span...
		// could give them classes/id's of numbers, or "star4" "star3" etc.
		//  and then ReactDOM get the node, get its class, manip the string, etc.

		// ORRRR I could change the state from static to dynamic
		// but.... only if the props are not static. And I still need to get the rating.
		if (this.props.static) {
			return;
		}
		this.setState({ rating: this.whichStar(e.target) });
	},

	handleMouseLeave: function () {
		this.setState({rating: this.props.rating || 0});
	},

	whichStar: function (star) {
		var starNum = star.id;
		return parseInt(starNum[starNum.length - 1])
	},

	starDisplay: function () {
		var bright = Math.round(this.state.rating);
		var stars = [];
		for (var i = 1; i <= 5; i++) {
			if (6 - i > bright) {
				stars.push(
						<span ><i
							onClick={ this.changeRating }
							id={"star" + (6-i)}
							onMouseOver={ this.handleMouseOver }
							className="fa fa-star-o" ></i></span>
					)
			} else {
				stars.push(
						<span className="bright"><i onClick={ this.changeRating } id={"star" + (6-i)} id={"star" + (6-i)}onMouseOver={ this.handleMouseOver } className="fa fa-star"></i></span>
					)
			}
		};

		return stars
	},

	render: function () {
		if (this.props.static) {
			return (
				<div className="rating">
          <a>
          	{ this.starDisplay() }
          </a>
        </div>
			)
		}

		return (
				<div className="rating">
					<a onMouseLeave={ this.handleMouseLeave }>
            { this.starDisplay() }
          </a>
				</div>
			)
	}
});

module.exports = Stars;
