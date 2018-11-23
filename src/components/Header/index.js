import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles.css';

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
						<li>
							<i className="fas fa-user-circle" /> Mon compte
						</li>
					</Link>

					<li onClick={this.onLogOut} className="ahref">
						<i className="fas fa-sign-out-alt" /> Se déconnecter
					</li>
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<Link to={{ pathname: '/log_in' }}>
						<li>
							<i className="fas fa-sign-in-alt" /> Se connecter
						</li>
					</Link>
					<Link to={{ pathname: '/sign_up' }}>
						<li>
							<i className="fas fa-plus-circle" /> S'inscrire
						</li>
					</Link>
				</Fragment>
			);
		}
	};
	render() {
		return (
			<header>
				<div className="container">
					<div>
						<Link to={{ pathname: '/' }}>
							<h1 className="logo">Lebonclone</h1>
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
