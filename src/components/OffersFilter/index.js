import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';

class OffersFilter extends Component {
	handleChange = e => {
		const { name, value } = e.target;

		this.setState({
			[name]: value
		});
	};

	handleSubmit = e => {
		axios
			.get('https://leboncoin-api.herokuapp.com/api/offer/with-count', {
				params: {
					title: this.state.title,
					priceMin: this.state.priceMin,
					priceMax: this.state.priceMax,
					sort: this.state.sort,
					skip: this.state.skip,
					limit: this.state.limit
				}
			})
			.then(response => {
				this.props.updateList(response.data.offers, response.data.count);
			});
		e.preventDefault();
	};

	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit}>
					<div className="filters-row">
						<div className="filters-first-column">
							<input
								id="title"
								name="title"
								type="text"
								placeholder="Que recherchez-vous?"
								value={this.props.title}
								onChange={this.handleChange}
							/>
							<div className="filters-price">
								<span>Prix entre</span>
								<input
									id="priceMin"
									name="priceMin"
									type="text"
									placeholder="Prix min"
									value={this.props.priceMin}
									onChange={this.handleChange}
								/>
								<span>et</span>
								<input
									id="priceMax"
									name="priceMax"
									type="text"
									placeholder="Prix max"
									value={this.props.priceMax}
									onChange={this.handleChange}
								/>
							</div>
						</div>

						<div className="filters-second-column">
							<select
								name="sort"
								onChange={this.handleChange}
								value={this.props.sort}
							>
								<option value="date-desc">Annonces plus récentes</option>
								<option value="date-asc">Annonces plus anciennes</option>
								<option value="price-desc">Du plus cher</option>
								<option value="price-asc">Du moins cher</option>
							</select>
							<button>Rechercher</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default OffersFilter;
