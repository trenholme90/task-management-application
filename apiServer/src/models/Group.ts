import mongoose, { Schema } from 'mongoose'
import { IGroupDoc } from '../interfaces/Group'

const groupSchema: Schema = new mongoose.Schema({
	author: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String },
	boards: { type: [], required: true },
	members: { type: {} },
	date: { type: Date, required: true },
})

// Export the model and return your ITask interface
export default mongoose.model<IGroupDoc>('Group', groupSchema)
