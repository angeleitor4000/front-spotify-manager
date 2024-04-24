import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dentro from "./pages/Dentro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element= {<LandingPage/>}/>
        <Route path="/dentro" element = {<Dentro/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
