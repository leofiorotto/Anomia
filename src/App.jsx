import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemCount from './components/ItemCount/ItemCount';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmparejarPalabra from './components/EmparejarPalabra/EmparejarPalabra';
import EmparejarSonido from './components/EmparejarSonido/EmparejarSonido';
import ElegiPersonaje from './components/ElegiPersonaje/ElegiPersonaje'
import PalabraAislada from './components/PalabraAislada/PalabraAislada'
import UnoSobra from './components/UnoSobra/UnoSobra'


function App() {
  return (
    <>
     <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/Anomia/' element={<ItemListContainer/> }/>
          {/* <Route path='/Anomia/detail/:productId' element={<ItemDetailContainer />} /> */}
          <Route path='/Anomia/detail/1' element={<ElegiPersonaje />} />
          <Route path='/Anomia/detail/2' element={<EmparejarSonido />} />
          <Route path='/Anomia/detail/3' element={<EmparejarPalabra />} />
          <Route path='/Anomia/detail/4' element={<UnoSobra />} />
          <Route path='/Anomia/detail/5' element={<PalabraAislada />} />
          <Route path='*' element={<h1>Error 404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App