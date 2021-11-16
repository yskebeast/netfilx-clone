import { useEffect, useState, VFC } from "react";
import YouTube from "react-youtube";
import { Axios } from "../Axios";
import "../styles/Row.css";
const movieTrailer = require("movie-trailer");

type Props = {
  title: string;
  fetchURL: string;
  isLargeRow?: boolean;
};

type Movies = {
  name: string;
  id: number;
  poster_path: string;
  backdrop_path: string;
};

const base_url = "https://image.tmdb.org/t/p/original/";

export const Row: VFC<Props> = (props) => {
  const { title, fetchURL, isLargeRow } = props;

  const [movies, setMovies] = useState<Movies[]>([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [error, setError] = useState<string>("");

  type Opts = {
    height: string;
    width: string;
    playerVars: any;
  };

  const opts: Opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = async (movie: Movies) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      await movieTrailer(movie?.name || "")
        .then((url: any) => {
          //https://www.youtube.com/watch?v=XtMThy8QKqU
          const urlParams: any = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err: string) => {
          setError(err);
        });
    }
  };

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
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
