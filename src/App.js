import "./App.css";
import Post from "./components/Posts/Post";
import Auth from "./pages/Auth";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h5>Instagram</h5>
      </header>
      <Auth />
      {/* <Post /> */}
    </div>
  );
}

export default App;
