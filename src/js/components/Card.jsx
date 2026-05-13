const Card = ({ name, handleDelete }) => {


    return (
        <div className="card">

            <ul>
                <p>
                    {name} <span
                        className="btn btn-danger"
                        onClick={() => handleDelete(name)}
                    > x </span>
                </p>
            </ul>
        </div>
    )
}

export default Card;