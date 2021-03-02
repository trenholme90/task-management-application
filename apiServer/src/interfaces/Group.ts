import { Document } from 'mongoose'
import { IBoard } from './Board'

export interface IGroupDoc extends Document {
	author: string
	title: string
	description: string
	boards: IBoard[]
	members: object[]
	date: Date
}
