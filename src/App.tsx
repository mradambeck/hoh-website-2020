import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shows from "./pages/Shows";
import Music from "./pages/Music";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/shows">Shows</NavLink>
          </li>
          <li>
            <NavLink to="/music">Music</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/music" element={<Music />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
