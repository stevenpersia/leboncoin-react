import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';

class Pagination extends Component {
	clickPrevious = () => {
		if (this.props.search.skip > 0) {
			const newSkip = this.props.search.skip - 25;
			this.props.changeSearch(
				{
					skip: newSkip
				},
				this.props.reloadAxios
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
			this.props.reloadAxios
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
