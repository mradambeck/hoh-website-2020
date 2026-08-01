import { Route, Routes } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Home from "./pages/home/Home";
import Live from "./pages/live/Live";
import Music from "./pages/music/Music";
import Video from "./pages/video/Video";
import Contact from "./pages/contact/Contact";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live" element={<Live />} />
          <Route path="/music" element={<Music />} />
          <Route path="/video" element={<Video />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
