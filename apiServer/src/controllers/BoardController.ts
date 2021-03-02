import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import Group from '../models/Group'
import { IGroupDoc } from '../interfaces/Group'
import { IBoard } from '../interfaces/Board'
import { ITask } from '../interfaces/Task'

module.exports = {
	async createBoard(req: Request, res: Response) {
		try {
			const {
				author,
				title,
				description,
				members,
				columns,
				tasks,
				date,
			}: {
				author: string
				title: string
				description: string
				members: object[]
				columns: string[]
				tasks: ITask[]
				date: Date
			} = req.body
			const groupId: string = req.params.id
			const _id: string = uuidv4()
			const newBoard: IBoard = {
				_id,
				author,
				title,
				description,
				members,
				columns,
				tasks,
				date,
			}
			const reqGroup: IGroupDoc = await Group.findById(groupId)
			const boardWithTitleMatch = (): IBoard[] => {
				const isTitleMatch: IBoard[] = reqGroup.boards.filter(
					(board) => board.title === title
				)
				return isTitleMatch
			}
			const existingBoard = boardWithTitleMatch().length > 0
			if (!existingBoard) {
				const reqBoards: IBoard[] = reqGroup.boards
				const updatedBoards: IBoard[] = [...reqBoards, newBoard]
				await Group.updateOne(
					{ _id: groupId },
					{
						$set: {
							boards: updatedBoards,
						},
					}
				)

				return res.json({ msg: 'Your new board has been added to this group!' })
			}

			return res.status(400).json({
				message:
					'A board with this name already exisits! Please use a different name for your group',
			})
		} catch (error) {
			throw Error(`Error while creating new board: ${error}`)
		}
	},

	async getBoard(req: Request, res: Response) {
		const groupId: string = req.params.id
		const boardId: string = req.params.boardId

		try {
			const reqGroup: IGroupDoc = await Group.findById(groupId)
			const boards: IBoard[] = reqGroup.boards
			const reqBoard: IBoard[] = boards.filter(
				(board: IBoard): IBoard => (board._id === boardId ? board : null)
			)

			if (reqBoard.length > 1)
				return res.json({ msg: 'Something went wrong. This board has duplication' })
			else return res.json(reqBoard[0])
		} catch (error) {
			res.status(400).json({
				message: 'Board ID does not exist. Did you delete this board?',
			})
		}
	},
	async editBoard(req: Request, res: Response) {
		interface member {
			_id: string
		}

		const {
			title,
			description,
			members,
			columns,
			date,
		}: {
			title: string
			description: string
			members: member[]
			columns: string[]
			date: Date
		} = req.body

		const groupId: string = req.params.id
		const boardId: string = req.params.boardId

		try {
			const reqGroup: IGroupDoc = await Group.findById(groupId)
			const boards: IBoard[] = reqGroup.boards
			const updatedBoards: IBoard[] = boards.map(
				(board: IBoard): IBoard => {
					const newMembers: member[] = members.filter((newMember: member) => {
						let existingIdMatch: string[] = []
						const newMemberId: string = newMember._id
						board.members.forEach((existingMember: member) => {
							const existingMemberId: string = existingMember._id
							if (existingMemberId === newMemberId)
								existingIdMatch.push(existingMemberId)
						})
						if (existingIdMatch.length === 0) return newMember
						else return false
					})

					if (board._id === boardId) {
						board.title = title
						board.description = description
						board.columns = columns
						board.date = date

						if (board.members.length === 0) board.members.push(...members)
						else {
							board.members.push(...newMembers)
						}
					}

					return board
				}
			)

			await Group.updateOne(
				{ _id: groupId },
				{
					$set: {
						boards: updatedBoards,
					},
				}
			)
			return res.json({ message: 'Board Succesfully updated...' })
		} catch (error) {
			res.status(400).json({
				message: `Failed to update this Group. Has it been deleted?: ${error}`,
			})
		}
	},
	async deleteBoard(req: Request, res: Response) {
		const groupId: string = req.params.id
		const boardId: string = req.params.boardId

		try {
			const reqGroup: IGroupDoc = await Group.findById(groupId)
			const boards: IBoard[] = reqGroup.boards
			let boardDeleted: boolean = false
			boards.map((board: IBoard, index) => {
				if (board._id === boardId) {
					boards.splice(index, 1)
					boardDeleted = true
				}
			})
			if (!boardDeleted)
				res.json({ msg: 'Something went wrong. This board was not found' })
			else {
				await Group.updateOne(
					{ _id: groupId },
					{
						$set: {
							boards: boards,
						},
					}
				)
				return res.json(`Board deleted. ${boards}`)
			}
		} catch (error) {
			res.status(400).json({
				message: 'Board ID does not exist. Did you delete this board?',
			})
		}
	},
}
