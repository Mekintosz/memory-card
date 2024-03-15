export default function Card(props) {
    return (
        <div>
            <img src={props.imgURL} />
            <p>{props.title}</p>
        </div>
    )

}