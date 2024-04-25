import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dentro from "./pages/Dentro";
import PruebaRuta from "./pages/PruebaRuta";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element= {<LandingPage/>}/>
        <Route path="/dentro" element = {<Dentro/>} />
        <Route path="/pruebar" element = {<PruebaRuta/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
