import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import './styles.css';
import axios from 'axios';

class Publish extends Component {
	state = {
		title: '',
		description: '',
		price: '',
		pictures: []
	};

	handleInputChange = e => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	handlePictures = pictures => {
		const newPictures = [...this.state.pictures, ...pictures.base64];
		this.setState({
			pictures: newPictures
		});
	};

	redirectToLoginPage = () => {
		this.props.history.push('/log_in');
	};

	onSubmit = e => {
		if (!this.props.user.token) {
			this.redirectToLoginPage();
		} else {
			axios
				.post(
					'https://leboncoin-api.herokuapp.com/api/offer/publish',
					{
						title: this.state.title,
						description: this.state.description,
						price: this.state.price,
						files: this.state.pictures
					},
					{ headers: { authorization: 'Bearer ' + this.props.user.token } }
				)
				.then(response => {
					this.props.history.push('/offer/' + response.data._id);
				})
				.catch(err => {
					console.log(err);
				});
			e.preventDefault();
		}
	};

	render() {
		const allPictures = [];
		for (let i = 0; i < this.state.pictures.length; i++) {
			allPictures.push(
				<img
					key={i}
					onClick={() => {
						const newPictures = [...this.state.pictures];
						newPictures.splice(i, 1);
						this.setState({ pictures: newPictures });
					}}
					src={this.state.pictures[i]}
					alt={this.state.title}
				/>
			);
		}
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
					<label>Ajouter des photos (7 photos au maximum)</label>
					<div className="image-container">
						<ReactFileReader
							fileTpes={['.png', '.jpg', '.jpeg']}
							base64={true}
							multipleFiles={true}
							handleFiles={this.handlePictures}
						>
							<span className="add-picture">
								<i className="fas fa-camera fa-2x" />
								Sélectionner vos photos
							</span>
						</ReactFileReader>
						<div className="added-image">{allPictures}</div>
					</div>

					<button>Publier son annonce</button>
				</form>
			</div>
		);
	}
}

export default Publish;
