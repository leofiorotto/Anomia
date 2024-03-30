import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmparejarPalabra from "./components/EmparejarPalabra/EmparejarPalabra";
import EmparejarSonido from "./components/EmparejarSonido/EmparejarSonido";
import ElegiPersonaje from "./components/ElegiPersonaje/ElegiPersonaje";
import PalabraAislada from "./components/PalabraAislada/PalabraAislada";
import UnoSobra from "./components/UnoSobra/UnoSobra";
import ChooseImg from "./components/EmparejarSonido/ChooseImg";
import ChooseWord from "./components/EmparejarSonido/ChooseWord";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          {/* <Route path='/detail/:productId' element={<ItemDetailContainer />} /> */}
          <Route path="/detail/1" element={<ElegiPersonaje />} />
          <Route path="/detail/2" element={<EmparejarSonido />} />
          <Route path="/detail/3" element={<EmparejarPalabra />} />
          <Route path="/detail/4" element={<UnoSobra />} />
          <Route path="/detail/5" element={<PalabraAislada />} />
          <Route path="/detail/2/img" element={<ChooseImg />} />
          <Route path="/detail/2/word" element={<ChooseWord />} />
          <Route path="*" element={<h1>Error 404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
