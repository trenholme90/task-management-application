import { ITask } from './Task'

export interface IBoard {
	_id: string
	author: string
	title: string
	description: string
	members: object[]
	columns: string[]
	tasks: ITask[]
	date: Date
}
