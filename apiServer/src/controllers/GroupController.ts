import { Request, Response } from 'express'
import Group from '../models/Group'
import { IGroupDoc } from '../interfaces/Group'
import { IBoard } from '../interfaces/Board'

module.exports = {
	async createGroup(req: Request, res: Response) {
		try {
			const {
				author,
				title,
				description,
				boards,
				members,
				date,
			}: {
				author: string
				title: string
				description: string
				boards: IBoard[]
				members: object[]
				date: Date
			} = req.body

			const existingGroup: IGroupDoc = await Group.findOne({ title })

			if (!existingGroup) {
				const group: IGroupDoc = await Group.create({
					author,
					title,
					description,
					boards,
					members,
					date,
				})

				// don't return password to client
				return res.json({
					_id: group._id,
					author: group.author,
					title: group.title,
					description: group.description,
					boards: group.boards,
					members: group.members,
					date: group.date,
				})
			}

			return res.status(400).json({
				message:
					'A group with this name already exisits! Please use a different name for your group',
			})
		} catch (error) {
			throw Error(`Error while creating new group: ${error}`)
		}
	},

	async getGroup(req: Request, res: Response) {
		const groupId: string = req.params.id

		try {
			const group: IGroupDoc = await Group.findById(groupId)
			return res.json(group)
		} catch (error) {
			res.status(400).json({
				message: 'Group ID does not exist. Did you delete this group?',
			})
		}
	},
	async getAllGroups(req: Request, res: Response) {
		console.log(req.body)
		const userID = req.body.params._id
		try {
			const groups: IGroupDoc[] = await Group.find({ author: userID })
			if (groups.length === 0) {
				return res.status(400).json({
					message: 'No groups exist for this user',
				})
			} else return res.json(groups)
		} catch (error) {
			res.status(400).json({
				message: 'An error occurred while reteiving your groups',
			})
		}
	},
	async editGroup(req: Request, res: Response) {
		const {
			author,
			title,
			description,
			boards,
			members,
			date,
		}: {
			author: string
			title: string
			description: string
			boards: IBoard[]
			members: object[]
			date: Date
		} = req.body

		try {
			await Group.updateMany(
				{},
				{ author, title, description, boards, members, date }
			)
			return res.json('Your group has succesfully been update!')
		} catch (error) {
			res.status(400).json({
				message: `Failed to update this Group. Has it been deleted?: ${error}`,
			})
		}
	},
	async deleteGroup(req: Request, res: Response) {
		const groupId: string = req.params.id

		try {
			await Group.findOneAndDelete({ _id: groupId })
			return res.json('Group has successfully been deleted')
		} catch (error) {
			res.status(400).json({
				message: 'Group ID does not exist. Did you delete this group?',
			})
		}
	},
}
