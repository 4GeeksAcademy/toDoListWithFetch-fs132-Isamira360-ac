import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import Card from "./Card";
import UserTask from "./UserTask";

//create your first component
const Home = () => {

	const [users, setUsers] = useState([])
	const [newUser, SetNewUser] = useState('')
	const [openUser, setOpenUser] = useState(null)


	useEffect(() => {

		fetch('https://playground.4geeks.com/todo/users/')
			.then(resp => {
				if (!resp.ok) throw new Error('error en el pedido')
				return resp.json()
			})

			.then(data => setUsers(data.users))
			.catch(err => console.log(err))

	}, [])

	//console.log(users)


	const handleChange = e => {

		SetNewUser(e.target.value)
	}

	const handelSubmit = e => {

		e.preventDefault()
		console.log('new user value', newUser)
		fetch('https://playground.4geeks.com/todo/users/' + newUser, {

			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({})
		})

			.then(resp => {
				if (!resp.ok) throw new Error('error en el pedido')
				return resp.json()
			})

			.then(data => {
				console.log(data)
				setUsers([...users, data])
				SetNewUser('')
			})

			.catch(err => console.log(err))
	}


	const deleteUser = (username) => {

		fetch('https://playground.4geeks.com/todo/users/' + username, {

			method: "DELETE"

		})

			.then(resp => {

				if (!resp.ok) throw new Error('error al borrar')

				const filteredUsers = users.filter(el => el.name !== username)

				setUsers(filteredUsers)

			})

			.catch(err => console.log(err))

	}

	return (

		<div className=" container bg-primary">
			<div className="col-12 col-md-10 col-lg-6">

				<h1> List of Users</h1>

				<div className="list-group">

				<form className="form-control " onSubmit={handelSubmit}>
					<input className="list-group-item my-input" type="text" value={newUser} onChange={handleChange} placeholder="add a new user" />
					<input type="submit" hidden />
				</form>

				</div>  
	
				{users && users.map(el => (

					<div key={el.id}>

						<div className="bg-danger"
							onClick={() =>
								setOpenUser(openUser === el.name ? null : el.name)
							}
							style={{ cursor: "pointer", fontWeight: "bold" }}
						>

							<ul className="list-group">
								<li className="list-group-item d-flex justify-content-between">
									{el.name}
									<i className="fa-solid fa-xmark " onClick={() => deleteUser(el.name)}></i>
								</li>
							</ul>

						</div>

						{openUser === el.name && (
							<UserTask username={el.name} />
						)}

					</div>

				))}

			</div>

		</div>


	);
};

export default Home;