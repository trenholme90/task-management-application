import React, { useEffect, useState } from 'react'
import Header from '../components/header/header'
import Board from '../components/board/board'
import Loading from '../components/loading'
import { useParams } from 'react-router-dom'

import api from '../api'
import ITask from '../interfaces/Task'
import IBoard from '../interfaces/Board'

interface params {
	id: String
}

export default function ProjectBoard(): JSX.Element {
	const [board, setBoard] = useState<IBoard>()
	const [tasks, setTasks] = useState<ITask[]>([])
	const params: params = useParams<{ id: string }>()

	useEffect(() => {
		const initBoard = async () => {
			await api.get(`/board/${params.id}`).then((response): void => {
				const board: IBoard = response.data
				const tasks: ITask[] = response.data.tasks
				console.log(tasks)
				console.log(board)
				setBoard(board)
				setTasks(tasks)
			})
		}

		initBoard()
	}, [])

	return (
		<div className='site-wrapper'>
			<Header />
			<div className='container'>
				<aside></aside>
				{tasks.length > 0 ? <Board tasks={tasks} /> : <Loading />}
			</div>
		</div>
	)
}
