import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/TheFooter";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <Nav />
      <MainPage />
      <Footer />
    </div>
  );
}

export default App;
