import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';

class Pagination extends Component {
	reloadAxios = () => {
		axios
			.get('https://leboncoin-api.herokuapp.com/api/offer/with-count', {
				params: this.props.search
			})
			.then(response => {
				this.props.updateList(response.data.offers, response.data.count);
			});
	};

	clickPrevious = () => {
		if (this.props.search.skip > 0) {
			const newSkip = this.props.search.skip - 25;
			this.props.changeSearch(
				{
					skip: newSkip
				},
				this.reloadAxios
			);
		} else {
			return null;
		}
	};

	clickNext = () => {
		const newSkip = this.props.search.skip + 25;
		this.props.changeSearch(
			{
				skip: newSkip
			},
			this.reloadAxios
		);
	};

	render() {
		return (
			<div className="pagination">
				<button onClick={this.clickPrevious}>Page précédente</button>
				<button onClick={this.clickNext}>Page suivante</button>
			</div>
		);
	}
}

export default Pagination;
