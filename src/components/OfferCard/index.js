import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.css';
import Empty from '../../assets/img/empty.jpg';

class OfferCard extends Component {
	render() {
		const picture =
			this.props.picture && this.props.picture[0]
				? this.props.picture[0].secure_url
				: Empty;

		return (
			<li
				className="offer-element"
				onClick={() => {
					this.props.history.push('/offer/' + this.props.id);
				}}
			>
				<img src={picture} alt={this.props.title} />
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
