import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Join from "./components/Chat/Join/Join";
import Chat from "./components/Chat/Chat";
import Timer from "./components/Timer/Timer"
// import Toolbar from "./components/Toolbar/Toolbar";

function App() {
  return (
    <div className="App">
      {/* <Router>
        <Route exact path="/" component={Join}></Route>
        <Route path="/chat" component={Chat}></Route>
      </Router> */}
      <Timer />
    </div>
  );
}

export default App;
