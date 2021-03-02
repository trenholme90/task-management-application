import React from 'react'
import { Link } from 'react-router-dom'

const Nav = (): JSX.Element => {
	const userID: String = localStorage.getItem('user')

	return (
		<nav>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to={`/user/${userID}`}>Login</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Nav
