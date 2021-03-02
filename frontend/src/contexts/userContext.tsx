import React, { createContext, useEffect, useState } from 'react'
import User from '../interfaces/User'

const initialState = {
	_id: '',
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	avatar: '',
	friends: [''],
}

export const UserContext = createContext<User>(initialState)
export const UserContextProvider = UserContext.Provider
export const UserContextConsumer = UserContext.Consumer

// export function UserContextProvider() {
// 	return (
// 		<UserContext.Provider value={}></UserContext.Provider>
// 	)
// }

// export function setUserContext(
// 	UserContext: React.Context<User>,
// 	newUser: User
// ) {
// 	const [user, setUser] = useState(UserContext)
// 	const context = UserContext

// 	useEffect(() => {
// 		setUser(newUser)
// 	}, [])

// 	return <context.Provider value={user}></context.Provider>
// }
