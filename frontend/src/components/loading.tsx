import React from 'react'

class Loading extends React.Component {
	render() {
		return (
			<div className='loader'>
				<span className='ball'></span>
				<span className='ball'></span>
				<span className='ball'></span>
			</div>
		)
	}
}

export default Loading
