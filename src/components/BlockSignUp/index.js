import React, { Component } from 'react';
import './styles.css';

class BlockSignUp extends Component {
	render() {
		return (
			<div className="signup-block">
				<img src={this.props.img} alt={this.props.head} />
				<div className="text">
					<h3>{this.props.head}</h3>
					<p>{this.props.content}</p>
				</div>
			</div>
		);
	}
}

export default BlockSignUp;
