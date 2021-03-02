import { Document } from 'mongoose'

interface IUser {
	firstName: string
	lastName: string
	password: string
	email: string
	avatar: string
	friends: string[]
}

interface IUserDoc extends Document {
	firstName: string
	lastName: string
	password: string
	email: string
	avatar: string
	friends: string[]
}

export { IUser, IUserDoc }
