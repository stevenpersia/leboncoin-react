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
							<i className="fas fa-sign-in-alt" /> S'inscrire
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
					</div>
					<div className="menu logged">
						<ul>
							<Link to={{ pathname: '/' }}>
								<li>Annonces</li>
							</Link>
							<Link to={{ pathname: '/publish' }}>
								<li>
									<i class="fas fa-plus-circle" /> Déposer une annonce
								</li>
							</Link>
							{this.renderAccountNav()}
						</ul>
					</div>
				</div>
			</header>
		);
	}
}

export default withRouter(Header);
