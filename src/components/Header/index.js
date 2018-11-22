import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import './styles.css';
import Logo from '../../assets/img/logo.png';

class Header extends Component {
	onLogOut = e => {
		this.props.logOut();
		this.props.history.push('/');
	};

	renderAccountNav = () => {
		if (this.props.user._id) {
			return (
				<Fragment>
					<Link to={{ pathname: '/account' }}>
						<li>Mon compte</li>
					</Link>

					<li onClick={this.onLogOut} className="ahref">
						Se déconnecter
					</li>
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<Link to={{ pathname: '/log_in' }}>
						<li>Se connecter</li>
					</Link>
					<Link to={{ pathname: '/sign_up' }}>
						<li>S'inscrire</li>
					</Link>
				</Fragment>
			);
		}
	};
	render() {
		return (
			<header>
				<div className="container">
					<Link to={{ pathname: '/' }}>
						<img src={Logo} alt="Leboncoin" />
					</Link>
					<div className="menu">
						<ul>
							<Link to={{ pathname: '/publish' }}>
								<li>Déposer une annonce</li>
							</Link>
							<Link to={{ pathname: '/offers' }}>
								<li>Offres</li>
							</Link>
						</ul>
					</div>
					<div className="account logged">
						<ul>{this.renderAccountNav()}</ul>
					</div>
				</div>
			</header>
		);
	}
}

export default withRouter(Header);
