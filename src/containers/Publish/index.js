import React, { Component, Fragment } from 'react';
import './styles.css';
import axios from 'axios';

class Publish extends Component {
	state = {
		title: '',
		description: '',
		price: ''
	};

	handleInputChange = e => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	onSubmit = e => {
		axios
			.post(
				'https://leboncoin-api.herokuapp.com/api/offer/publish',
				{
					title: this.state.title,
					description: this.state.description,
					price: this.state.price
				},
				{ headers: { authorization: 'Bearer ' + this.props.user.token } }
			)
			.then(response => {
				console.log(response.data);
				this.props.history.push('/offer/' + response.data._id);
			})
			.catch(err => {
				console.log(err);
			});
		e.preventDefault();
	};

	render() {
		return (
			<div className="container publish">
				<div className="title">Votre annonce</div>
				<form onSubmit={this.onSubmit}>
					<label>Titre de l'annonce</label>
					<input
						name="title"
						type="text"
						placeholder="Titre"
						onChange={this.handleInputChange}
					/>
					<label>Texte de l'annonce</label>
					<textarea
						name="description"
						type="text"
						placeholder="Description"
						onChange={this.handleInputChange}
					/>
					<label>Prix</label>
					<input
						name="price"
						type="text"
						placeholder="20"
						onChange={this.handleInputChange}
					/>
					<button>Publier son annonce</button>
				</form>
			</div>
		);
	}
}

export default Publish;
