import Card from "./Card";
import { useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";

export default function GameBoard(props) {
  const [imageURLs, setImageURLs] = useState(() => null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clickedImageIDs, setClickedImageIDs] = useState([]);
  const { score, setScore, highestScore, setHighestScore, setWin } = props;

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

  function logClickedImage(imageID) {
    setClickedImageIDs((prev) => {
      return [...prev, imageID];
    });
  }

  function handleClick(imageID) {
    const isLoged = clickedImageIDs.includes(imageID);
    if (!isLoged) {
      logClickedImage(imageID);
      setScore((prev) => prev + 1);
      randomizeCardsOrder();
      return;
    } else if (highestScore < score) {
      setHighestScore(score);
      setScore(0);
      setClickedImageIDs([]);
      randomizeCardsOrder();
      return;
    } else {
      setScore(0);
      setClickedImageIDs([]);
      randomizeCardsOrder();
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

  if (error) return <p className="status">A network error was encountered</p>;
  if (loading) return <p className="status">Loading...</p>;
  if (score == 10) setWin(true);

  const cards = [];
  imageURLs.forEach((image) => {
    cards.push(
      <Card
        key={image.ID}
        handleClick={() => handleClick(image.ID)}
        imgURL={image.url}
        title={image.title}
      />
    );
  });

  return (
    <>
      <div className="game-board">{cards}</div>
    </>
  );
}
