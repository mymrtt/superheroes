// Libs
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Screens
import Onboarding from '../screens/Onboarding';
import Dashboard from '../screens/Dashboard';
import SuperHeroes from '../screens/SuperHeroes';

import PrivateRoute from './PrivateRoute';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Onboarding} />
			<PrivateRoute exact path='/dashboard' component={Dashboard} />
			<PrivateRoute exact path='/superheroes' component={SuperHeroes} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
