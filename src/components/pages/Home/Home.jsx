import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Col, Input, Row, Form } from 'reactstrap';

export class Home extends Component {
	state = {
		userName: '',
	};

	handleChangeUsername = (e) => {
		const { value: userName } = e.target;
		this.setState({ userName });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.history.push(`/${this.state.userName}`);
	};

	render() {
		const { userName } = this.state;

		return (
			<Form onSubmit={this.handleSubmit}>
				<Row noGutters>
					<Col xs='3'>
						<Input
							type='text'
							name='username'
							id='username'
							placeholder='Enter username'
							value={userName}
							onChange={this.handleChangeUsername}
						/>
					</Col>
					<Button outline color='primary' className='ml-3' type='submit'>
						Submit
					</Button>
				</Row>
			</Form>
		);
	}
}

export default withRouter(Home);
