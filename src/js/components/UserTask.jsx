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
    <div>

        <ul>
            {tasks && tasks.map(el =>

                <li key={el.id}>

                    {el.label}

                    <button onClick={() => deleteTask(el.id)}>
                        X
                    </button>

                </li>

            )}

        </ul>

        <form onSubmit={handleSubmit}>

            <input
                type="text"
                value={task}
                onChange={e => setTask(e.target.value)}
                placeholder="add a new task"
            />

            <input type="submit" />

        </form>

    </div>

)

}

export default UserTask;