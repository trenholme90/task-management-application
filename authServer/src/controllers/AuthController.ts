import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import RefreshToken from '../models/RefreshToken'
import { IUser } from '../interfaces/User'
import { IUserDoc } from '../interfaces/User'
import { IUserCredentials } from '../interfaces/UserCredentials'
import { IRefreshTokenDoc } from '../models/RefreshToken'
import { ITokenRequest } from '../interfaces/RequestCustom'
import generateAccessToken from '../functions/generateAccesstoken'

module.exports = {
	async loginUser(req: Request, res: Response) {
		try {
			const {
				password,
				email,
			}: {
				password: string
				email: string
			} = req.body
			const userCredentials: IUserCredentials = req.body

			const userExists: IUserDoc = await User.findOne({ email })

			// if no user in the database
			if (!userExists) {
				return res.status(200).json({
					message: 'User not found. Do you want to register instead?',
				})
			}

			// if password matches return user and email to be stored in browser
			if (userExists && (await bcrypt.compare(password, userExists.password))) {
				const { firstName, lastName, password, email, avatar, friends } = userExists
				const userInfo: IUser = {
					firstName,
					lastName,
					password,
					email,
					avatar,
					friends,
				}
				const fullName: string = `${userInfo.firstName} ${userInfo.lastName}`
				const accessToken: string = generateAccessToken({ name: fullName })
				const refreshToken: string = jwt.sign(
					userInfo,
					process.env.REFRESH_TOKEN_SECRET
				)
				await RefreshToken.create({ token: refreshToken })
				return res.json({ userInfo, accessToken, refreshToken })
			} else {
				return res
					.status(200)
					.json({ message: 'User email or password does not match' })
			}
		} catch (error) {
			throw Error(`Error while logging in new user: ${error}`)
		}
	},
	async token(req: ITokenRequest, res: Response) {
		try {
			const existingToken: IRefreshTokenDoc = await RefreshToken.findOne({
				token: req.body.token,
			})
			if (req.body.token === null) return res.sendStatus(401)
			if (existingToken === null) return res.sendStatus(403)
			jwt.verify(
				req.body.token,
				process.env.REFRESH_TOKEN_SECRET,
				(err: Error, user: IUser) => {
					if (err) {
						res.sendStatus(403)
					}
					const fullName: string = `${user.firstName} ${user.lastName}`
					const accessToken = generateAccessToken({ name: fullName })
					res.json({ accessToken })
				}
			)
		} catch (error) {
			throw Error(`Error while creating new token: ${error}`)
		}
	},
	async logoutUser(req: ITokenRequest, res: Response) {
		try {
			await RefreshToken.findOneAndDelete({ token: req.body.token }, (err) => {
				if (err) {
					return res.sendStatus(403)
				}
				return res.sendStatus(204)
			})
		} catch (error) {
			throw Error(`Problem logging out user: ${error}`)
		}
	},
}
