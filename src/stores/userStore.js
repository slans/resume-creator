import { makeAutoObservable } from 'mobx';
import api from '../api';

class UserStore {
	user = null;
	userRepos = [];
	userReposLanguages = [];
	isLoading = false;
	userNotFound = false;

	constructor() {
		makeAutoObservable(this);
	}

	getUser = async (userName) => {
		try {
			this.isLoading = true;
			this.user = (await api.get(`users/${userName}`)).data;
			console.log(this.user);
		} catch (error) {
			if (error.response.status === 404) {
				this.user = null;
				this.userNotFound = true;
			}
		} finally {
			this.isLoading = false;
		}
	};
}

export default new UserStore();
