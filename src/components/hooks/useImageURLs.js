import { useState, useEffect } from "react";

export default function useImageURLs() {
  const [imageURLs, setImageURLs] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.nasa.gov/planetary/apod?api_key=QHmVj0WRX7rWvITSnwwvxDUHUSnPZagpeZkGyODi&count=10")
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => setImageURLs(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  },[]);

  return { imageURLs, error, loading };
}