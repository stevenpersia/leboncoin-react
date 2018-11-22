import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

class Offers extends Component {
	state = {
		offers: []
	};
	render() {
		const offersFound = [];
		for (let i = 0; i < this.state.offers.length; i++) {
			offersFound.push(
				<li
					className="offer-element"
					onClick={() => {
						this.props.history.push('/offer/' + this.state.offers[i]._id);
					}}
				>
					<img alt="" />
					<div className="offer-content">
						<span className="title">{this.state.offers[i].title}</span>
						<p>{this.state.offers[i].description}</p>
						<span className="price">{this.state.offers[i].price} €</span>
					</div>
				</li>
			);
		}
		return (
			<div className="container">
				<ul className="offers-list">{offersFound.reverse()}</ul>
			</div>
		);
	}
	componentDidMount() {
		axios
			.get('https://leboncoin-api.herokuapp.com/api/offer')
			.then(response => {
				this.setState({
					offers: response.data
				});
			});
	}
}

export default Offers;
