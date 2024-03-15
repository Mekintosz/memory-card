export default function Card(props) {
    return (
        <div className="card" >
            <img src={props.imgURL} onClick={props.handleClick}/>
            <p>{props.title}</p>
        </div>
    )
}