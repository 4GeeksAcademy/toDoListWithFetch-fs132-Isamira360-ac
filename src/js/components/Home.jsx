import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import Card from "./Card";

//create your first component
const Home = () => {

	const [users, setUsers] = useState([])
	const [newUser, SetNewUser] = useState('')


	useEffect(() => {



		fetch('https://playground.4geeks.com/todo/users')
			.then(resp => {
				if (!resp.ok) throw new Error('error en el pedido')
				return resp.json()
			})

			.then(data => setUsers(data.users))
			.catch(err => console.log(err))

	}, [])

	console.log(users)


	const handleChange = e => {

		SetNewUser(e.target.value)


	}

	const handelSubmit = e => {

		e.preventDefault()
		console.group('new user value', newUser)
		fetch('https://playground.4geeks.com/todo/users/' + newUser, {

			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: {}
		})

			.then(resp => {
				if (!resp.ok) throw new Error('error en el pedido')
				return resp.json()
			})

			.then(data => setUsers(data.users))
			.catch(err => console.log(err))



	}

	return (

		<div className="text-center">


			<form onSubmit={handelSubmit}>
				<input type="text" value={newUser} onChange={handleChange} />
				<input type="submit" />

			</form>
			{users && users.map(el => <Card key={el.id} name={el.name} />)}

		</div>
	);
};

export default Home;