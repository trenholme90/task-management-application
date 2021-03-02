import React, { useEffect, useState } from 'react'
import IHeroCard from '../../interfaces/HeroCard'

export default function HeroCard(props: IHeroCard): JSX.Element {
	// const [groups, setGroups] = useState<IGroup[]>([])

	// const user: String = localStorage.getItem('user')

	// useEffect(() => {
	// 	const getBoards = async () => {
	// 		console.log(user)
	// 		const results = await api
	// 			.post('/dashboard', { params: { _id: user } })
	// 			.then((response): IGroup[] => response.data)
	// 		console.log(results)
	// 		setGroups(results)
	// 	}

	// 	getBoards()
	// }, [])

	return (
		<div className='hero-card'>
			<h2>Jump back in...</h2>
			<a className='hero-card' href={`group/${props._id}`}></a>
		</div>
	)
}
