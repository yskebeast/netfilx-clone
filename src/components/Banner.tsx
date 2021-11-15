import { useEffect, useState, VFC } from "react";
import { Axios } from "../Axios";
import { requests } from "../requests";
import "../styles/Banner.css";

type Props = {};

type Movie = {
  backdrop_path?: any;
  name?: string;
  original_name?: string;
  overview: any;
};

const base_url = "https://image.tmdb.org/t/p/original/";

export const Banner: VFC<Props> = (props) => {
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const fetchData = async () => {
      const request = await Axios.get(requests.feachNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    };
    fetchData();
  }, []);

  const truncate = (str: any, num: number) => {
    return str?.length > num ? str?.substr(0, num - 1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.name || movie?.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
        <div className="banner--fadeBottom"></div>
    </header>
  );
};
