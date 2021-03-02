import { Request } from 'express'
import { IUserCredentials } from './UserCredentials'

export interface ILoginRequest extends Request {
	user?: IUserCredentials
}

export interface ITokenRequest extends Request {
	token?: string
}

export interface RequestCustom extends Request {
	user?: IUserCredentials
}
