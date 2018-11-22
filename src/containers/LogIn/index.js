import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

class LogIn extends Component {
	state = {
		email: '',
		password: ''
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
			});
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
						/>
						<label>Mot de passe</label>
						<input
							name="password"
							type="password"
							value={this.state.password}
							placeholder="Mot de passe"
							onChange={this.handleInputChange}
						/>
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
