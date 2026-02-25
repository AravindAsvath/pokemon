import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonList from "../features/pokemon/components/PokemonList";
import PokemonDetail from "../features/pokemon/components/PokemonDetail";

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
    </BrowserRouter>
  );
};

export default Router;