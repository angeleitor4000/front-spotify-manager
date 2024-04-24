import {  HashRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dentro from "./pages/Dentro";
import PruebaRuta from "./pages/PruebaRuta";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index element= {<LandingPage/>}/>
        <Route path="/dentro" element = {<Dentro/>} />
        <Route path="/pruebar" element = {<PruebaRuta/>} />
      </Routes>
    </HashRouter>
    
  );
}

export default App;
