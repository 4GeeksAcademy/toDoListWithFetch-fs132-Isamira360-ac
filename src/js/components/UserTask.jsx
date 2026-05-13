import { useEffect, useState } from "react"

const UserTask = ({ username }) => {

    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState([])

    useEffect(() => {

        fetch('https://playground.4geeks.com/todo/users/' + username)
            .then(resp => {
                if (!resp.ok) throw new Error('error')
                return resp.json()
            })
            .then(data => {
                console.log(data)
                setTasks(data.todos)
            })
            .catch(err => console.log(err))
    }, [])


    const handleSubmit = e => {
        e.preventDefault();
        if (task.trim() === '') return
        const formData = {
            label: task,
            is_done: false
        }


        fetch('https://playground.4geeks.com/todo/todos/' + username, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(resp => {
                if (!resp.ok) throw new Error('error en el pedido')
                return resp.json()
            })
            .then(data => {
                console.log(data)
                setTasks([...tasks, data])
                setTask('')
            })
            .catch(err => console.log(err))

    }


    const deleteTask = (taskId) => {

        fetch('https://playground.4geeks.com/todo/todos/' + taskId, {
            method: "DELETE"
        })
            .then(resp => {
                if (!resp.ok) throw new Error('error al borrar')
                const filteredTasks = tasks.filter(el => el.id !== taskId)
                setTasks(filteredTasks)
            })
            .catch(err => console.log(err))

    }


    return (
        <div className="container ">

            <form onSubmit={handleSubmit}>
                <input className="form-control"
                    type="text"
                    value={task}
                    onChange={e => setTask(e.target.value)}
                    placeholder="Add a new task + Enter"
                />
                <input type="submit" hidden />
            </form>


            <ul className="list-group">
                {tasks && tasks.map(el =>
                    <li className="list-group-item task-item list-group-item-action list-group-item-light" key={el.id}>
                        {el.label}
                        <i className="fa-solid fa-xmark delete-icon" onClick={() => deleteTask(el.id)}></i>
                    </li>
                )}
            </ul>

        </div>

    )

}

export default UserTask;