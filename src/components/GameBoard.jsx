import Card from "./Card";
import useImageURLs from "./hooks/useImageURLs";


export default function GameBoard() {
    const { imageURLs, error, loading } = useImageURLs();
    if (error) return <p>A network error was encountered</p>;
    if (loading) return <p>Loading...</p>;
     
    const cards = []
    imageURLs.forEach(image => {
       cards.push( <Card
         imgURL={image.url}
         title={image.title}
         />)
        })

    return (
        <div className="game-board">{cards}</div>
        )
        
}


