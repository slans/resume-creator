import dayjs from 'dayjs';
import { makeAutoObservable } from 'mobx';
import api from '../api';

class UserStore {
	user = null;
	userRepos = [];
	userReposLanguages = [];
	isLoading = true;
	userNotFound = false;

	constructor() {
		makeAutoObservable(this);
	}

	getUser = async (userName) => {
		try {
			this.isLoading = true;
			this.user = (await api.get(`users/${userName}`)).data;
		} catch (error) {
			if (error.response.status === 404) {
				this.user = null;
				this.userNotFound = true;
			}
		} finally {
			this.isLoading = false;
		}
	};

	getUserRepos = async (userName) => {
		try {
			this.isLoading = true;
			const result = (await api.get(`users/${userName}/repos`)).data;
			if (result.length) {
				const self = this;
				const reposLanguages = [];
				this.userRepos = result.filter((repo) => !repo.private);
				await (async function processUserRepos() {
					for (const repo of self.userRepos) {
						const languages = await self.fetchUserLanguages(repo, userName);
						reposLanguages.push(languages);
					}
				})();
				this.userReposLanguages = [...reposLanguages];
			}
		} catch (error) {
		} finally {
			this.isLoading = false;
		}
	};

	fetchUserLanguages = async (repo, userName) => {
		try {
			return (await api.get(`repos/${userName}/${repo.name}/languages`)).data;
		} catch (error) {}
	};

	get reposLanguages() {
		if (this.userReposLanguages.length) {
			const reposLanguages = {};
			this.userReposLanguages.forEach((languages) => {
				for (let key in languages) {
					key in reposLanguages ? (reposLanguages[key] += languages[key]) : (reposLanguages[key] = languages[key]);
				}
			});

			const totalBytes = Object.values(reposLanguages).reduce((result, value) => (result += value), 0);
			for (let key in reposLanguages) {
				reposLanguages[key] = ((reposLanguages[key] / totalBytes) * 100).toFixed(2);
			}

			return reposLanguages;
		}
		return null;
	}

	get lastUpdatedRepos() {
		return this.userRepos.length > 0 ? [...this.userRepos].sort(sortRecentlyUpdatedRepos) : null;
	}
}

function sortRecentlyUpdatedRepos(a, b) {
	return dayjs(b.updated_at) - dayjs(a.updated_at);
}

export default new UserStore();
