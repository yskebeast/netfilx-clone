import "./styles/App.css";
import { Banner } from "./components/Banner";
import { Nav } from "./components/Nav";
import { Row } from "./components/Row";
import { requests } from "./requests";

function App() {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchURL={requests.feachNetflixOriginals}
        isLargeRow={true}
      />
      <Row
        title="Trending Now"
        fetchURL={requests.feachTrending}
        isLargeRow={false}
      />
      <Row
        title="Top Rated"
        fetchURL={requests.feactTopRated}
        isLargeRow={false}
      />
      <Row
        title="Action Movies"
        fetchURL={requests.feactActionMovies}
        isLargeRow={false}
      />
      <Row
        title="Comedy Movies"
        fetchURL={requests.feactComedyMovies}
        isLargeRow={false}
      />
      <Row
        title="Horror Movies"
        fetchURL={requests.feactHorrorMovies}
        isLargeRow={false}
      />
      <Row
        title="Romance Movies"
        fetchURL={requests.feactRomanceMovies}
        isLargeRow={false}
      />
      <Row
        title="Document Movies"
        fetchURL={requests.feactDocumentMovies}
        isLargeRow={false}
      />
    </div>
  );
}

export default App;
