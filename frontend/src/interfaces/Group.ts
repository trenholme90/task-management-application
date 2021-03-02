import IBoard from './Board'

export interface IGroup {
	_id: string
	author: string
	title: string
	description: string
	boards: IBoard[]
	members: object[]
	date: Date
}
