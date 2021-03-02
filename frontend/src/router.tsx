import React from 'react'
import { BrowserRouter, BrowserRouter as Switch, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import ProjectBoard from './pages/projectBoard'

export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={Home}></Route>
				<Route path='/user/login' component={Login}></Route>
				<Route path='/board/:id' component={ProjectBoard}></Route>
			</Switch>
		</BrowserRouter>
	)
}
