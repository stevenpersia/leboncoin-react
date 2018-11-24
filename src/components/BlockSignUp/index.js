import React, { Component } from 'react';
import './styles.css';

class BlockSignUp extends Component {
	render() {
		return (
			<div className="signup-block">
				<div className="block-icon">
					<i className={'fas fa-3x fa-' + this.props.icon} />
				</div>
				<div className="text">
					<h3>{this.props.head}</h3>
					<p>{this.props.content}</p>
				</div>
			</div>
		);
	}
}

export default BlockSignUp;
