import React, { Component } from 'react';
import axios from 'axios';
import BlockSignUp from '../../components/BlockSignUp';
import './styles.css';
import Visibilite from '../../assets/img/visibilite.png';
import Informe from '../../assets/img/informe.png';
import Temps from '../../assets/img/temps.png';

class SignUp extends Component {
	state = {
		username: '',
		email: '',
		password: ''
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
			.post('https://leboncoin-api.herokuapp.com/api/user/sign_up', {
				email: this.state.email,
				password: this.state.password,
				username: this.state.username
			})
			.then(response => {
				this.props.logIn({
					token: response.data.token,
					username: response.data.account.username,
					_id: response.data._id
				});

				this.props.history.push('/');

				console.log(response.data);
			})
			.catch(err => {
				console.log(err);
			});
		e.preventDefault();
	};

	render() {
		return (
			<div className="container signup">
				<div className="signup-content">
					<h2>Pourquoi créer un compte ?</h2>
					<BlockSignUp
						img={Temps}
						head="Gagnez du temps"
						content="Publiez vos annonces rapidement, avec vos informations pré-remplies chaque fois que vous souhaitez déposer une nouvelle annonce."
					/>
					<BlockSignUp
						img={Informe}
						head="Soyez les premiers informés"
						content="Créez des alertes Immo ou Emploi et ne manquez jamais l'annonce qui vous intéresse."
					/>
					<BlockSignUp
						img={Visibilite}
						head="Visibilité"
						content="Suivez les statistiques de vos annonces (nombre de fois où votre annonce a été vue, nombre de contacts reçus)."
					/>
				</div>
				<div className="signup-form">
					<h2>Créez un compte</h2>
					<form onSubmit={this.onSubmit}>
						<label>Pseudo</label>
						<input
							name="username"
							type="text"
							value={this.props.username}
							placeholder="Pseudo"
							onChange={this.handleInputChange}
						/>
						<label>Adresse e-mail</label>
						<input
							name="email"
							type="email"
							value={this.props.email}
							placeholder="Adresse e-mail"
							onChange={this.handleInputChange}
						/>
						<label>Mot de passe</label>
						<input
							name="password"
							type="password"
							value={this.props.password}
							placeholder="Mot de passe"
							onChange={this.handleInputChange}
						/>
						<button>Créer mon compte personnel</button>
					</form>
				</div>
			</div>
		);
	}
}

export default SignUp;
