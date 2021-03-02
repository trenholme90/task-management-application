import e, { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import Group from '../models/Group'
import { IGroupDoc } from '../interfaces/Group'
import { IBoard } from '../interfaces/Board'
import { ITask } from '../interfaces/Task'

module.exports = {
	async createTask(req: Request, res: Response) {
		try {
			const {
				author,
				title,
				description,
				status,
				date,
			}: {
				author: string
				title: string
				description: string
				status: string
				date: Date
			} = req.body
			const groupId: string = req.params.id
			const boardId: string = req.params.boardId
			const _id: string = uuidv4()
			const newTask: ITask = {
				_id,
				author,
				title,
				description,
				status,
				date,
			}
			const reqGroup: IGroupDoc = await Group.findById(groupId)
			let tasksUpdated: boolean
			const updatedBoards: IBoard[] = reqGroup.boards.map((board) => {
				if (board._id === boardId) {
					const updatedTasks: ITask[] = [...board.tasks, newTask]
					const updatedBoard: IBoard = board
					updatedBoard.tasks = updatedTasks
					tasksUpdated = true
					return updatedBoard
				} else {
					return board
				}
			})
			if (tasksUpdated) {
				await Group.updateOne(
					{ _id: groupId },
					{
						$set: {
							boards: updatedBoards,
						},
					}
				)

				return res
					.status(200)
					.json({ msg: 'Your new task has been added to the board!' })
			} else {
				return res
					.status(400)
					.json({ msg: 'Sorry this board could not be found when creating a task' })
			}
		} catch (error) {
			throw Error(`Error while creating a new task: ${error}`)
		}
	},
	async getTask(req: Request, res: Response) {
		try {
			const groupId: string = req.params.id
			const boardId: string = req.params.boardId
			const taskId: string = req.params.taskId
			const reqGroup: IGroupDoc = await Group.findById(groupId)
			const reqBoard: IBoard[] = reqGroup.boards.filter(
				(board) => board._id === boardId
			)
			const reqTask: ITask[] = reqBoard[0].tasks.filter(
				(task) => task._id === taskId
			)
			if (reqTask.length === 0) {
				return res.status(400).json({
					message: 'This ID does not exist',
				})
			} else {
				return res.status(200).json(reqTask[0])
			}
		} catch (error) {
			throw Error(`Error while deleting user: ${error}`)
		}
	},
	async updateTask(req: Request, res: Response) {
		try {
			const {
				author,
				title,
				description,
				status,
				date,
			}: {
				author: string
				title: string
				description: string
				status: string
				date: Date
			} = req.body
			const groupId: string = req.params.id
			const boardId: string = req.params.boardId
			const taskId: string = req.params.taskId
			const reqGroup: IGroupDoc = await Group.findById(groupId)
			const reqBoard: IBoard[] = reqGroup.boards.filter(
				(board) => board._id === boardId
			)
			const reqTask: ITask[] = reqBoard[0].tasks.filter(
				(task) => task._id === taskId
			)
			if (reqTask.length === 0) {
				return res.status(400).json({
					message: 'This ID does not exist',
				})
			} else {
				const updatedTasks: ITask[] = reqBoard[0].tasks.map((task) => {
					if (task._id === taskId) {
						const _id = taskId
						task = { _id, author, title, description, status, date }
						return task
					} else {
						return task
					}
				})
				reqBoard[0].tasks = updatedTasks
				console.log(reqBoard[0])
				const updatedBoards: IBoard[] = reqGroup.boards.map((board) => {
					if (board._id === boardId) {
						board = reqBoard[0]
						return board
					} else {
						return board
					}
				})
				await Group.updateOne(
					{ _id: groupId },
					{
						$set: {
							boards: updatedBoards,
						},
					}
				)
				return res.json({ message: 'Task Succesfully updated...' })
			}
		} catch (error) {
			throw Error(`Error while updating your task: ${error}`)
		}
	},
	async deleteTask(req: Request, res: Response) {
		try {
			const groupId: string = req.params.id
			const boardId: string = req.params.boardId
			const taskId: string = req.params.taskId
			const reqGroup: IGroupDoc = await Group.findById(groupId)
			const reqBoard: IBoard[] = reqGroup.boards.filter(
				(board) => board._id === boardId
			)
			const reqTask: ITask[] = reqBoard[0].tasks.filter(
				(task) => task._id === taskId
			)
			if (reqTask.length === 0) {
				return res.status(400).json({
					message: 'This ID does not exist',
				})
			} else {
				let taskDeleted: boolean = false
				const updatedTasks: ITask[] = reqBoard[0].tasks.map(
					(task: ITask, index) => {
						if (task._id === taskId) {
							reqBoard[0].tasks.splice(index, 1)
							taskDeleted = true
						} else {
							return task
						}
					}
				)
				if (taskDeleted) {
					reqBoard[0].tasks = updatedTasks

					const updatedBoards: IBoard[] = reqGroup.boards.map((board) => {
						if (board._id === boardId) {
							board = reqBoard[0]
							return board
						} else {
							return board
						}
					})
					await Group.updateOne(
						{ _id: groupId },
						{
							$set: {
								boards: updatedBoards,
							},
						}
					)
					return res.status(200).json({ message: 'Task Succesfully deleted...' })
				} else {
					return res
						.status(400)
						.json({ message: 'Sorry this task could not be found' })
				}
			}
		} catch (error) {
			throw Error(`Error while deleting task: ${error}`)
		}
	},
}
