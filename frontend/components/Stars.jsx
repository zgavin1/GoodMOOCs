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

	changeRating: function () {
		// probably open the review create/edit form
		// with this.state.rating prepended
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
		this.setState({rating: this.props.rating});
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
						<span ><i id={"star" + (6-i)} onMouseOver={ this.handleMouseOver } className="fa fa-star-o"></i>
</span>
					)
			} else {
				stars.push(
						<span className="bright"><i id={"star" + (6-i)} id={"star" + (6-i)}onMouseOver={ this.handleMouseOver } className="fa fa-star"></i></span>
					)
			}
		};

		return stars
	},



            // <span className="star5">☆</span><span className="star4" >☆</span><span className="star3">☆</span><span className="star2">☆</span><span className="star1">☆</span>

	render: function () {
		// in both cases, static or not, a certain number
		// of stars should be pre-highlighted 
		// debugger
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
					<a onClick={ this.changeRating } onMouseLeave={ this.handleMouseLeave }>
            { this.starDisplay() }
          </a>
				</div>
			)
	}
});

module.exports = Stars;
