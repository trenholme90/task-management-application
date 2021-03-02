import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

export default function Header(): JSX.Element {
	const user = useContext(UserContext)
	return (
		<div className='header'>
			<h1>Welcome Back {user.firstName}</h1>
		</div>
	)
}
