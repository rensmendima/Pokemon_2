import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import { getPokemon, getAllPokemon } from './services/pokemon';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


function App() {

  const [pokemonData, setPokemonData] = useState([])
  const [loading, setLoading] = useState(true);
  const initialURL = 'https://pokeapi.co/api/v2/pokemon?limit=150'

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL)
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, [])


  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon)
      return pokemonRecord;
    }));
  setPokemonData(_pokemonData);
  };

  
  return (
    <>
      <div>
        {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
          <>
           <p></p>

            <input
        type="text"
        placeholder="Search Pokemon"
        onChange={e => setSearch(e.target.value)}
      /> <p></p>
            <div className="grid-container">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}

            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;