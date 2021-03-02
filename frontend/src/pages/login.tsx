import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Logo from '../components/logo'
import api from '../api'
import User from '../interfaces/User'
import Validation from '../interfaces/Validation'

export default function Login(setUser: React.Dispatch<User>): JSX.Element {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const history = useHistory()

	type userCheck = User | Validation
	console.log(setUser)
	async function userLogin(e: React.FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault()
		const req = await api.post('/user/login', { email, password })
		const user: userCheck = req.data
		if ('_id' in user) {
			setUser(user)
			// Update context to new user
			localStorage.setItem('user', user._id)
			history.push('/')
		} else {
			// fire form validation
			console.log(user.message)
		}
	}

	return (
		<div className='site-wrapper--centralise'>
			<Logo />
			<form onSubmit={userLogin}>
				<div className='form-element'>
					<label>Email:</label>
					<input
						type='email'
						placeholder='joeBloggs@company.com'
						autoComplete='on'
						name='email'
						onChange={(e) => setEmail(e.target.value)}></input>
				</div>
				<div className='form-element'>
					<label>Password:</label>
					<input
						type='password'
						placeholder='password'
						name='password'
						onChange={(e) => setPassword(e.target.value)}></input>
				</div>
				<button>Login</button>
				<span>Not registered? Sign up!</span>
			</form>
		</div>
	)
}
