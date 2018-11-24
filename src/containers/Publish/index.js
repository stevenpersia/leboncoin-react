import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import './styles.css';
import axios from 'axios';

class Publish extends Component {
	state = {
		title: '',
		description: '',
		price: '',
		pictures: [],
		errors: { title: false, description: false, price: false },
		errorsMessage: {
			title: '',
			description: '',
			price: ''
		}
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
		if (this.state.title && this.state.description && this.state.price) {
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
		} else {
			const titleValidation = this.state.title.length < 5 ? true : false;
			const descriptionValidation =
				this.state.description.length === 0 ? true : false;
			const priceValidation = this.state.price.length === 0 ? true : false;

			this.setState({
				errors: {
					title: titleValidation,
					description: descriptionValidation,
					price: priceValidation
				}
			});
		}
		e.preventDefault();
	};

	render() {
		const allPictures = [];
		for (let i = 0; i < this.state.pictures.length; i++) {
			allPictures.push(
				<div
					key={i}
					onClick={() => {
						const newPictures = [...this.state.pictures];
						newPictures.splice(i, 1);
						this.setState({ pictures: newPictures });
					}}
					className="image"
					style={{ backgroundImage: `url(${this.state.pictures[i]})` }}
				>
					<div className="delete">
						<i className="fas fa-trash fa-2x" />
						Supprimer la photo
					</div>
				</div>
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
						className={this.state.errors.title === true ? 'error' : ''}
					/>
					<span className="small">
						{this.state.errors.title === true
							? "Veuillez indiquer un titre d'au moins 5 caractères."
							: ''}
					</span>
					<label>Texte de l'annonce</label>
					<textarea
						name="description"
						type="text"
						placeholder="Description"
						onChange={this.handleInputChange}
						className={this.state.errors.description === true ? 'error' : ''}
					/>
					<span className="small">
						{this.state.errors.description === true
							? 'Veuillez indiquer une description.'
							: ''}
					</span>
					<label>Prix</label>
					<input
						name="price"
						type="text"
						placeholder="20"
						onChange={this.handleInputChange}
						className={this.state.errors.price === true ? 'error' : ''}
					/>
					<span className="small">
						{this.state.errors.price === true
							? 'Veuillez indiquer un prix.'
							: ''}
					</span>
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
						<div className="all-images">{allPictures}</div>
					</div>

					<button>Publier votre annonce</button>
				</form>
			</div>
		);
	}
	componentDidMount() {
		if (!this.props.user.token) {
			this.redirectToLoginPage();
		}
	}
}

export default Publish;
