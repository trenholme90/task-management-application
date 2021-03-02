import React from 'react'
import Task from './partials/task'
import ITask from '../../interfaces/Task'

type myProps = {
	tasks: ITask[]
}

type myState = {
	tasks: ITask[]
}

export default class Board extends React.Component<myProps, myState> {
	state: myState = {
		tasks: this.props.tasks,
	}
	componentDidMount() {
		console.log(this.state.tasks)
	}

	render() {
		return (
			<main className='board'>
				<div className='column'>
					<h2>To-Do</h2>
					<div className='column__container'>
						{this.state.tasks.map((task: ITask) => {
							if (task.status === 'to-do') {
								return <Task task={task} key={task.title.toString()} />
							}
						})}
					</div>
				</div>
				<div className='column'>
					<h2>In Progress</h2>
					<div className='column__container'>
						{this.state.tasks.map((task: ITask) => {
							if (task.status === 'in-progress') {
								return <Task task={task} key={task.title.toString()} />
							}
						})}
					</div>
				</div>
				<div className='column'>
					<h2>Done</h2>
					<div className='column__container'>
						{this.state.tasks.map((task: ITask) => {
							if (task.status === 'done') {
								return <Task task={task} key={task.title.toString()} />
							}
						})}
					</div>
				</div>
			</main>
		)
	}
}
