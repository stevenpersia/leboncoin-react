import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.css';

class OfferCard extends Component {
	render() {
		return (
			<li
				className="offer-element"
				onClick={() => {
					this.props.history.push('/offer/' + this.props.id);
				}}
			>
				<img alt="" />
				<div className="offer-content">
					<span className="title">{this.props.title}</span>
					<p>{this.props.description}</p>
					<span className="price">{this.props.price} €</span>
				</div>
			</li>
		);
	}
}

export default withRouter(OfferCard);
