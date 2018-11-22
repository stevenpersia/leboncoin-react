import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './styles.css';

class Offer extends Component {
	state = {
		offer: {}
	};
	render() {
		if (Object.keys(this.state.offer).length === 0) {
			return <p>Loading ...</p>;
		}

		let tovo = () => {
			if (this.state.offer.creator.account.username === 'Tovo') {
				return (
					<span className="crown">
						{this.state.offer.creator.account.username}
						<i class="fas fa-crown" />
					</span>
				);
			} else {
				return <span>{this.state.offer.creator.account.username}</span>;
			}
		};

		return (
			<div className="container offer">
				<div className="offer-main">
					<div className="offer-img">
						<img alt="" />
						<div className="offer-img-info">
							<h3>{this.state.offer.title}</h3>
							<span className="price">{this.state.offer.price} €</span>
						</div>
					</div>

					<div className="offer-content">
						<h4>Description </h4>
						<p>{this.state.offer.description}</p>
					</div>
				</div>
				<div className="offer-sidebar">
					<div className="avatar">
						<div className="i-avatar">
							<i class="fas fa-user fa-3x" />
						</div>

						{tovo()}
					</div>

					<a className="btn tel">
						<i class="fas fa-phone" /> Voir le numéro
					</a>
				</div>
			</div>
		);
	}

	componentDidMount() {
		axios
			.get(
				'https://leboncoin-api.herokuapp.com/api/offer/' +
					this.props.match.params.id
			)
			.then(response => {
				this.setState({
					offer: response.data
				});
				console.log(response.data);
			});
	}
}

export default Offer;
