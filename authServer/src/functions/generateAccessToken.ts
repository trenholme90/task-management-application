import jwt from 'jsonwebtoken'
import name from '../interfaces/Name'

export default function generateAccessToken(fullName: name) {
	const accessToken = jwt.sign(fullName, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '15s',
	})
	return accessToken
}
