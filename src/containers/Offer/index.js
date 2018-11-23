import React, { Component } from 'react';
import axios from 'axios';
import Empty from '../../assets/img/empty.jpg';
import './styles.css';

class Offer extends Component {
	state = {
		offer: {},
		picture: ''
	};

	handleClick = params => {
		this.setState({ picture: params });
	};

	render() {
		/* Loading page for undefined issue (asynchronus) */
		if (Object.keys(this.state.offer).length === 0) {
			return <p>Loading ...</p>;
		}

		/* Just a private joke */
		let chief = () => {
			if (this.state.offer.creator.account.username === 'stevenpersia') {
				return (
					<span className="crown">
						{this.state.offer.creator.account.username}
						<i className="fas fa-crown" />
					</span>
				);
			} else {
				return <span>{this.state.offer.creator.account.username}</span>;
			}
		};

		/* Gallery of images */
		const gallery = [];
		for (let i = 0; i < this.state.offer.pictures.length; i++) {
			gallery.push(
				<img
					key={i}
					onClick={() => {
						this.handleClick(this.state.offer.pictures[i].secure_url);
					}}
					src={this.state.offer.pictures[i].secure_url}
					alt={this.state.offer.title + ' ' + i}
				/>
			);
		}

		/* If there is no description */
		const description = this.state.offer.description ? (
			<div className="offer-content">
				<h4>Description </h4>
				<p>{this.state.offer.description}</p>
			</div>
		) : null;

		return (
			<div className="container offer">
				<div className="offer-main">
					<div className="offer-img">
						<div className="big-img">
							<img src={this.state.picture} alt={this.state.offer.title} />
						</div>
						<div className="gallery">{gallery}</div>
						<div className="offer-img-info">
							<h2>{this.state.offer.title}</h2>
							<span className="price">{this.state.offer.price} €</span>
						</div>
					</div>
					{description}
				</div>
				<div className="offer-sidebar">
					<div className="avatar">
						<div className="i-avatar">
							<i className="fas fa-user fa-3x" />
						</div>

						{chief()}
					</div>
					<a href="/" className="btn tel">
						<i className="fas fa-phone" /> Voir le numéro
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
				const picture =
					response.data.pictures.length > 0
						? response.data.pictures[0].secure_url
						: Empty;

				this.setState({
					offer: response.data,
					picture: picture
				});
			});
	}
}

export default Offer;
