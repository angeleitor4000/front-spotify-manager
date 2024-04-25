import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import PruebaRuta from "./pages/PruebaRuta";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element= {<LandingPage/>}/>
        <Route path="/home" element = {<Home/>} />
        <Route path="/pruebar" element = {<PruebaRuta/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
