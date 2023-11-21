import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/TheFooter";
import MainPage from "./pages/MainPage";
import TvPage from "./pages/TvPage";
import TvDetailPage from "./pages/TvDetailPage";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/tvprogram" element={<TvPage />} />
        <Route path="/tvprogram/:tvid" element={<TvDetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
