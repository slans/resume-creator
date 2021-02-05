import React, { Component } from 'react';
import { Button, Col, Container, Input, Row, Form } from 'reactstrap';

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
					<Button outline color='primary' className='ml-3'>
						Submit
					</Button>
				</Row>
			</Form>
		);
	}
}

export default Home;
