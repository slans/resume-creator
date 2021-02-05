import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import User from '../pages/User/User';

function Routes() {
	return (
		<Switch>
			<Route path='/' exact component={Home} />
			<Route path='/:username' component={User} />
		</Switch>
	);
}

export default Routes;
