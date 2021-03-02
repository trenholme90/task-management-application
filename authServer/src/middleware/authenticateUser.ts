import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { RequestCustom } from '../interfaces/RequestCustom'

export default function authenticateUser(
	req: RequestCustom,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if (token == null) return res.status(401)

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
		if (err) return res.sendStatus(403)
		req.user = req.body
		next()
	})
}
