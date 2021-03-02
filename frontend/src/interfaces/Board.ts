import ITask from './Task'

export default interface IBoard {
	_id: string
	author: string
	title: string
	description: string
	members: object[]
	columns: string[]
	tasks: ITask[]
	date: Date
}
