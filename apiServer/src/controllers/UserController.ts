import { Request, Response } from 'express'
import User from '../models/User'
import { IUserDoc } from '../interfaces/User'
import bcrypt from 'bcrypt'

module.exports = {
	async createUser(req: Request, res: Response) {
		try {
			const {
				firstName,
				lastName,
				password,
				email,
				friends,
				avatar,
			}: {
				firstName: string
				lastName: string
				password: string
				email: string
				friends: string[]
				avatar: string
			} = req.body

			const existingUser: IUserDoc = await User.findOne({ email })

			if (!existingUser) {
				// sets hash password to database for security. The higher the number the bigger the password.
				const hashedPassword = await bcrypt.hash(password, 10)
				const user: IUserDoc = await User.create({
					firstName,
					lastName,
					email,
					password: hashedPassword,
					friends,
					avatar,
				})

				// don't return password to client
				return res.json({
					_id: user._id,
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					friends,
					avatar,
				})
			}

			return res.status(400).json({
				message: 'Email user already exisits! Do you want to login instead',
			})
		} catch (error) {
			throw Error(`Error while registering new user: ${error}`)
		}
	},

	async getUser(req: Request, res: Response) {
		const userId: string = req.params.id

		try {
			const user: IUserDoc = await User.findById(userId)
			return res.json(user)
		} catch (error) {
			res.status(400).json({
				message: 'User ID does not exist. Register here!',
			})
		}
	},

	async loginUser(req: Request, res: Response) {
		try {
			const {
				password,
				email,
			}: {
				password: string
				email: string
			} = req.body

			if (!email || !password) {
				return res.status(200).json({ message: 'Required field missing' })
			}

			const user: IUserDoc = await User.findOne({ email })

			// if no user in the database
			if (!user) {
				return res.status(200).json({
					message: 'User not found. Do you want to register instead?',
				})
			}

			// if password matches return user and email to be stored in browser
			if (user && (await bcrypt.compare(password, user.password))) {
				const userResponse = {
					_id: user._id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
				}

				return res.json(userResponse)
			} else {
				return res
					.status(200)
					.json({ message: 'User email or password does not match' })
			}
		} catch (error) {
			throw Error(`Error while logging in new user: ${error}`)
		}
	},
	async editUser(req: Request, res: Response) {
		const {
			firstName,
			lastName,
			password,
			email,
			friends,
			avatar,
		}: {
			firstName: string
			lastName: string
			password: string
			email: string
			friends: string[]
			avatar: string
		} = req.body

		try {
			await User.updateMany(
				{},
				{ firstName, lastName, password, email, friends, avatar }
			)
			return res.json('Your user information has succesfully been update!')
		} catch (error) {
			res.status(400).json({
				message: `Failed to update your user information: ${error}`,
			})
		}
	},
	async deleteUser(req: Request, res: Response) {
		const userId: string = req.params.id

		try {
			await User.findOneAndDelete({ _id: userId })
			return res.json('User has successfully been deleted')
		} catch (error) {
			res.status(400).json({
				message: `Something went wrong while deleting your account: ${error}`,
			})
		}
	},
}
