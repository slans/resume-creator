import React from 'react';
import { Container } from 'reactstrap';
import Routes from '../Routes/Routes';
import './App.scss';

function App() {
	return (
		<Container className='pt-3 pb-3'>
			<Routes />
		</Container>
	);
}

export default App;
