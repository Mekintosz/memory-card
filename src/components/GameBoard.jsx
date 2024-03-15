import Card from "./Card";
// import useImageURLs from "./hooks/useImageURLs";
import { useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";

export default function GameBoard(props) {
  const [imageURLs, setImageURLs] = useState(() => null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [clickedImageIDs, setClickedImageIDs] = useState([]);
  const [win , setWin] = useState(false)

  function logClickedImage(imageID) {
    const isLoged = clickedImageIDs.includes(imageID);
    
    if (!isLoged && score < 10)  {
      
    setClickedImageIDs((prev) => {
     return [...prev, imageID]});
     setScore(prev => prev + 1)
     randomizeCardsOrder()
    } else if (!isLoged && score === 10) {
      setScore(0)
      setClickedImageIDs([])
      setWin(true)
    } else {
      if (highestScore < score) setHighestScore(score)
      setScore(0)
      setClickedImageIDs([])
      
    }
  }

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${
        import.meta.env.VITE_NASA_API_KEY
      }&count=10`
    )
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => setImageURLs(setImageIDs(response)))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  function setImageIDs(imgArr) {
    return imgArr.map((image) => ({ ...image, ID: uuidV4() }));
  }

  const randomizeCardsOrder = () => {
    const nextImageURLs = [...imageURLs];

    for (let i = nextImageURLs.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      let currentImageURL = nextImageURLs[randomIndex];
      nextImageURLs[randomIndex] = nextImageURLs[i];
      nextImageURLs[i] = currentImageURL;
    }

    setImageURLs(nextImageURLs);
  };

  const cards = [];
  imageURLs.forEach((image) => {
    cards.push(
      <Card
        key={image.ID}
        handleClick={() => logClickedImage(image.ID)}
        imgURL={image.url}
        title={image.title}
      />
    );
  });

  return (
    <>
     {win && <div className="score-board">
      <h3>10/10 You can start new game!!!</h3>
              <button onClick={GameBoard}>New game</button>
              </div>}
      <p>Score: {score}</p>
      <p>Highest score: {highestScore}</p>
      <div className="game-board">{cards}</div>
    
    </>
  );
}
