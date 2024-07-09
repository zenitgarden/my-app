import { useEffect } from "react";
import Header from "../Header";
import Character from "./Character";
import { Link, useLocation } from "react-router-dom";
import Hero from "../Hero";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { charactersState } from "../..";

function Characters() {
  const characters = useRecoilValue(charactersState);
  const setCharacters = useSetRecoilState(charactersState);
  const path = useLocation(); 

  useEffect(() => {
    if(localStorage.getItem('locations')) {
      return;
    }
    const fetchData = async () => {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const result = await response.json();
      setCharacters(result.results.map((character) => ({
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        image: character.image,
        location: '',
      })));
    };

    fetchData();
  }, [setCharacters]);
  return (
    <>
     <Header path={path}/>
     <div className="w-full bg-white pt-2">
        <Hero text="The Rick and Morty"/>
        <div className="flex bg-black justify-center">
          <div className="grid grid-cols-1 xl:grid-cols-2 py-20 gap-8 px-6 2xl:px-0">
          {characters.map((character) => ( 
            <Link key={character.id} to={`/characters/${character.id}`}>
              <Character key={character.id} img={character.image} name={character.name} 
              species={character.species} status={character.status} /> 
            </Link>
          ))}
          </div>
        </div>
     </div>
    </>
  );
}

export default Characters;
