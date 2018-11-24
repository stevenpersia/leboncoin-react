import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

class LogIn extends Component {
	state = {
		email: '',
		password: '',
		errors: { email: false, password: false },
		invalidRequest: false
	};

	handleInputChange = e => {
		const target = e.target;
		const name = target.name;
		const value = target.value;

		this.setState({
			[name]: value
		});
	};

	onSubmit = e => {
		if (this.state.email && this.state.password) {
			axios
				.post('https://leboncoin-api.herokuapp.com/api/user/log_in', {
					email: this.state.email,
					password: this.state.password
				})
				.then(response => {
					if (response.data && response.data.token) {
						this.props.logIn({
							token: response.data.token,
							username: response.data.account.username,
							_id: response.data._id
						});
						this.props.history.push('/');
					}
				})
				.catch(err => {
					console.log(err);
					this.setState({
						invalidRequest: true,
						errors: {
							email: true,
							password: true
						}
					});
				});
		} else {
			const emailValidation = this.state.email.length === 0 ? true : false;
			const passwordValidation =
				this.state.password.length === 0 ? true : false;

			this.setState({
				errors: {
					email: emailValidation,
					password: passwordValidation
				}
			});
		}
		e.preventDefault();
	};

	render() {
		return (
			<div className="container login">
				<div className="login-form">
					<h2>Connexion</h2>
					<form onSubmit={this.onSubmit}>
						<label>Adresse e-mail</label>
						<input
							name="email"
							type="email"
							value={this.state.email}
							placeholder="Adresse e-mail"
							onChange={this.handleInputChange}
							className={this.state.errors.email === true ? 'error' : ''}
						/>
						<span className="small">
							{this.state.errors.email === true &&
							this.state.invalidRequest === true
								? 'Adresse e-mail invalide.'
								: '' || this.state.errors.email === true
								? 'Veuillez indiquer une adresse e-mail.'
								: ''}
						</span>
						<label>Mot de passe</label>
						<input
							name="password"
							type="password"
							value={this.state.password}
							placeholder="Mot de passe"
							onChange={this.handleInputChange}
							className={this.state.errors.password === true ? 'error' : ''}
						/>
						<span className="small">
							{this.state.errors.password === true &&
							this.state.invalidRequest === true
								? 'Mot de passe invalide.'
								: '' || this.state.errors.password === true
								? 'Veuillez indiquer un mot de passe.'
								: ''}
						</span>
						<button>Se connecter</button>
					</form>
					<div className="create-account">
						<h3>Vous n'avez pas de compte ?</h3>
						<Link to={{ pathname: '/sign_up' }} className="btn-outline">
							Créer un compte
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default LogIn;
