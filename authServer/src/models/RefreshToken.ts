import mongoose, { Schema, Document } from 'mongoose'

export interface IRefreshTokenDoc extends Document {
	token: string
}

const refreshTokenSchema: Schema = new mongoose.Schema({
	token: { type: String, required: true },
})

export default mongoose.model<IRefreshTokenDoc>(
	'RefreshToken',
	refreshTokenSchema
)
