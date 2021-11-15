import { useEffect, useState, VFC } from "react";
import { Axios } from "../Axios";
import '../styles/Row.css'

type Props = {
  title: string;
  fetchURL: string;
  isLargeRow?: boolean
};

type Movies = {
  poster_path: string;
  name: string;
  id: number;
  backdrop_path: string;
};

const base_url = "https://image.tmdb.org/t/p/original/";

export const Row: VFC<Props> = (props) => {
  const { title, fetchURL, isLargeRow } = props;

  const [movies, setMovies] = useState<Movies[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await Axios.get(fetchURL);
      console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchURL]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            key={movie.id}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};
