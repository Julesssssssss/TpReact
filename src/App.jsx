import { BrowserRouter as Router, Route, Routes } from "react-router";
import "./app.css";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
