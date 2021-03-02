import React, { useEffect, useState, useContext } from 'react'
import Header from '../components/header/header'
import { useHistory } from 'react-router-dom'
import api from '../api'
import { IGroup } from '../interfaces/Group'
import VerticalMenu from '../components/verticalMenu'
import HeroCard from '../components/cards/heroCard'
import Loading from '../components/loading'
import { UserContext, UserContextProvider } from '../contexts/UserContext'

export default function Home(): JSX.Element {
	const [groups, setGroups] = useState<IGroup[]>([])
	const [firstGroup, setFirstGroup] = useState<IGroup>()
	const loggedInUser = useContext(UserContext)
	const user: String = localStorage.getItem('user')
	const history = useHistory()

	!user ? history.push('/user/login') : ''

	useEffect(() => {
		const getGroups = async () => {
			console.log(user)
			const results = await api
				.post('/dashboard', { params: { _id: user } })
				.then((response): IGroup[] => response.data)
			console.log(results)
			setGroups(results)
			setFirstGroup(results[0])
		}

		getGroups()
	}, [])

	return (
		<div className='site-wrapper'>
			<VerticalMenu />
			<div className='container'>
				<UserContextProvider value={loggedInUser}>
					<Header />
				</UserContextProvider>
				<main>
					<section className={''}></section>
					{firstGroup ? (
						<HeroCard
							_id={firstGroup._id}
							title={firstGroup.title}
							description={firstGroup.description}
							date={firstGroup.date}
						/>
					) : (
						<div>Homepage Card</div>
					)}
				</main>
				{/* {groups.length > 0 ? (
					groups.map((group, index) => <div>Homepage Card</div>)
				) : (
					<Loading />
				)} */}
			</div>
			<aside></aside>
		</div>
	)
}
