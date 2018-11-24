import React, { Component } from 'react';
import axios from 'axios';
import BlockSignUp from '../../components/BlockSignUp';
import './styles.css';
class SignUp extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		errors: { username: false, email: false, password: false },
		errorsMessage: {
			username: '',
			email: '',
			password: ''
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

	onSubmit = e => {
		if (this.state.username && this.state.email && this.state.password) {
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
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			const usernameValidation = this.state.username.length < 5 ? true : false;
			const emailValidation = this.state.email.length === 0 ? true : false;
			const passwordValidation = this.state.password.length < 8 ? true : false;

			this.setState({
				errors: {
					username: usernameValidation,
					email: emailValidation,
					password: passwordValidation
				}
			});
		}
		e.preventDefault();
	};

	render() {
		return (
			<div className="container signup">
				<div className="signup-content">
					<h2>Pourquoi créer un compte ?</h2>
					<BlockSignUp
						icon="clock"
						head="Gagnez du temps"
						content="Publiez vos annonces rapidement, avec vos informations pré-remplies chaque fois que vous souhaitez déposer une nouvelle annonce."
					/>
					<BlockSignUp
						icon="bell"
						head="Soyez les premiers informés"
						content="Créez des alertes Immo ou Emploi et ne manquez jamais l'annonce qui vous intéresse."
					/>
					<BlockSignUp
						icon="eye"
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
							className={this.state.errors.username === true ? 'error' : ''}
						/>
						<span className="small">
							{this.state.errors.username === true
								? "Veuillez indiquer un pseudo d'au moins 5 caractères."
								: ''}
						</span>
						<label>Adresse e-mail</label>
						<input
							name="email"
							type="email"
							value={this.props.email}
							placeholder="Adresse e-mail"
							onChange={this.handleInputChange}
							className={this.state.errors.email === true ? 'error' : ''}
						/>
						<span className="small">
							{this.state.errors.email === true
								? 'Veuillez indiquer une adresse e-mail valide.'
								: ''}
						</span>
						<label>Mot de passe</label>
						<input
							name="password"
							type="password"
							value={this.props.password}
							placeholder="Mot de passe"
							onChange={this.handleInputChange}
							className={this.state.errors.password === true ? 'error' : ''}
						/>
						<span className="small">
							{this.state.errors.password === true
								? "Veuillez indiquer un mot de passe d'au moins 8 caractères."
								: ''}
						</span>
						<button>Créer mon compte personnel</button>
					</form>
				</div>
			</div>
		);
	}
}

export default SignUp;
