import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Spinner } from 'reactstrap';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';

class User extends Component {
	async componentDidMount() {
		const { userStore, match } = this.props;
		const { username } = match.params;
		await userStore.getUser(username);
		await userStore.getUserRepos(username);
	}

	renderLastUpdatedRepos() {
		const { lastUpdatedRepos } = this.props.userStore;
		return lastUpdatedRepos.map((repo) => (
			<li key={repo.id} className='mt-1'>
				<a href={repo.html_url}>{repo.html_url}</a>, <span>{dayjs(repo.updated_at).format('DD-MM-YYYY')}</span>
			</li>
		));
	}

	renderLisfProgramLanguages() {
		const { reposLanguages } = this.props.userStore;
		return Object.entries(reposLanguages).map(([languageName, useAmount]) => (
			<li key={nanoid()} className='mt-1'>{`${languageName}: ${useAmount}%`}</li>
		));
	}

	render() {
		const { userStore } = this.props;

		if (userStore.isLoading) {
			return (
				<div className='d-flex justify-content-center'>
					<Spinner color='primary' />
				</div>
			);
		}
		if (userStore.userNotFound) {
			return <p>User not found</p>;
		}

		if (userStore.user) {
			const { user, lastUpdatedRepos, reposLanguages } = userStore;
			const { name, public_repos, created_at } = user;

			return (
				<>
					<Link to='/'>Back to home page</Link>
					<h1 className='mt-3'>{name}</h1>
					<div className='mt-2'>Amount of public repositories: {public_repos}</div>
					<div className='mt-2'>Account created: {dayjs(created_at).format('DD-MM-YYYY')}</div>
					{lastUpdatedRepos && (
						<>
							<div className='mt-2'>Most recently edited public repositories:</div>
							<ul>{this.renderLastUpdatedRepos()}</ul>
						</>
					)}
					{reposLanguages && (
						<>
							<div className='mt-2'>List of used programming languages:</div>
							<ul>{this.renderLisfProgramLanguages()}</ul>
						</>
					)}
				</>
			);
		}

		return null;
	}
}

export default inject('userStore')(observer(User));
