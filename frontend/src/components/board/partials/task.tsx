import React from 'react'
import ITask from '../../../interfaces/Task'

interface ITaskInfo {
	task: {
		author: String
		title: String
		description: String
		status: String
		date: Date
	}
}

class Task extends React.Component<ITaskInfo> {
	constructor(props: ITaskInfo) {
		super(props)
	}
	state: ITaskInfo = {
		task: {
			author: '',
			title: '',
			description: '',
			status: '',
			date: new Date(),
		},
	}

	componentDidMount() {
		this.setState({
			task: {
				author: this.props.task.author,
				title: this.props.task.title,
				description: this.props.task.description,
				status: this.props.task.status,
				date: this.props.task.date,
			},
		})
	}

	render() {
		return (
			<div className='card'>
				{this.state.task.title}
				<p>{this.state.task.status}</p>
			</div>
		)
	}
}

export default Task
