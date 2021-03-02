import mongoose, { Schema } from 'mongoose'
import { IUserDoc } from '../interfaces/User'

const userSchema: Schema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	friends: { type: [] },
	avatar: { type: String },
})

// Export the model and return your ITask interface
export default mongoose.model<IUserDoc>('User', userSchema)
