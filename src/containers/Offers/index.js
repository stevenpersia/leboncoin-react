import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './styles.css';
import OffersFilter from '../../components/OffersFilter';
import OfferCard from '../../components/OfferCard';
import Pagination from '../../components/Pagination';

class Offers extends Component {
	state = {
		offers: [],
		count: 0,
		search: {
			title: '',
			priceMin: '',
			priceMax: '',
			sort: '',
			skip: 0,
			limit: 25
		}
	};
	updateList = (offers, count) => {
		this.setState({
			offers: offers,
			count: count
		});
	};

	changeSearch = (newSearch, axios) => {
		this.setState(
			{
				search: {
					...this.state.search,
					...newSearch
				}
			},
			axios
		);
	};

	render() {
		const offersFound = [];
		for (let i = 0; i < this.state.offers.length; i++) {
			offersFound.push(
				<OfferCard
					key={this.state.offers[i]._id}
					id={this.state.offers[i]._id}
					title={this.state.offers[i].title}
					description={this.state.offers[i].description}
					price={this.state.offers[i].price}
				/>
			);
		}
		return (
			<Fragment>
				<div className="filters">
					<OffersFilter
						updateList={this.updateList}
						search={this.state.search}
					/>
				</div>
				<div className="container">
					<h4>{this.state.count} résultats</h4>
					<ul className="offers-list">{offersFound}</ul>
					<Pagination
						updateList={this.updateList}
						search={this.state.search}
						changeSearch={this.changeSearch}
						count={this.state.count}
					/>
				</div>
			</Fragment>
		);
	}
	componentDidMount() {
		axios
			.get(
				'https://leboncoin-api.herokuapp.com/api/offer/with-count?skip=0&limit=25'
			)
			.then(response => {
				this.setState({
					count: response.data.count,
					offers: response.data.offers
				});
			});
	}
}

export default Offers;
