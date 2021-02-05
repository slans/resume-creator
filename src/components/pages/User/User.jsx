import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Spinner } from 'reactstrap';
import { toJS } from 'mobx';

class User extends Component {
	componentDidMount() {
		const { userStore } = this.props;
		userStore.getUser('slans');
	}

	render() {
		const { userStore } = this.props;
		console.log('user', toJS(userStore.user));

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

		return <p>Test</p>;
	}
}

export default inject('userStore')(observer(User));
