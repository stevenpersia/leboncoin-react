import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import Home from './containers/Home';
import Account from './containers/Account';
import SignUp from './containers/SignUp';
import LogIn from './containers/LogIn';
import Publish from './containers/Publish';
import Offer from './containers/Offer';
import Offers from './containers/Offers';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

class App extends Component {
	state = {
		user: {
			_id: Cookies.get('_id') || '',
			username: Cookies.get('username') || '',
			token: Cookies.get('token') || ''
		}
	};

	logIn = user => {
		Cookies.set('_id', user._id);
		Cookies.set('username', user.username);
		Cookies.set('token', user.token);

		this.setState({
			user: {
				_id: user._id,
				username: user.username,
				token: user.token
			}
		});
	};

	logOut = () => {
		Cookies.remove('_id');
		Cookies.remove('username');
		Cookies.remove('token');

		this.setState({
			user: {
				_id: '',
				username: '',
				token: ''
			}
		});
	};

	render() {
		return (
			<Fragment>
				<Router>
					<Fragment>
						<Header logOut={this.logOut} user={this.state.user} />
						<Route
							path="/"
							exact
							render={props => <Home {...props} user={this.state.user} />}
						/>
						<Route
							path="/account"
							render={props => (
								<Account {...props} logIn={this.logIn} user={this.state.user} />
							)}
						/>
						<Route
							path="/sign_up"
							render={props => (
								<SignUp {...props} logIn={this.logIn} user={this.state.user} />
							)}
						/>
						<Route
							path="/log_in"
							render={props => (
								<LogIn {...props} logIn={this.logIn} user={this.state.user} />
							)}
						/>
						<Route
							path="/publish"
							render={props => (
								<Publish {...props} logIn={this.logIn} user={this.state.user} />
							)}
						/>
						<Route
							path="/offer/:id"
							render={props => <Offer {...props} user={this.state.user} />}
						/>
						<Route
							path="/offers"
							render={props => <Offers {...props} user={this.state.user} />}
						/>
					</Fragment>
				</Router>
				<Footer />
			</Fragment>
		);
	}
}

export default App;
