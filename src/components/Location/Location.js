import { useRecoilValue } from "recoil";
import Header from "../Header";
import { charactersState, locationsState } from "../..";
import Character from "../Characters/Character";
import { useLocation } from "react-router-dom";

function Location() {
  const locations = useRecoilValue(locationsState);
  const characters = useRecoilValue(charactersState);
  const path = useLocation()

  const handleOnClick = (e) => {
    e.preventDefault()
    const x = Array.from(e.currentTarget.children);
    x.forEach((child) => {
        if(child.className.includes('grid')) {
            if(child.style.display === 'none') {
                child.style.display = 'grid';
            } else {
                child.style.display = 'none'
            }
        }
    })
  }

  const handleFilter = (location) => characters.filter((char) => char.location === location);

  return (
    <>
        <Header path={path}/>
        <div className="flex flex-col py-10 px-6 sm:px-16 gap-6 bg-slate-950 h-fit text-white">
            <h1 className="text-2xl">List location</h1>
            { locations.length > 0 ? locations.map((location, index) => (
                <div key={index} data-value={location.value} className="bg-slate-800 w-full p-4 rounded-md cursor-pointer 
                hover:bg-slate-700 transition-all duration-300" onClick={handleOnClick}>
                    <p className="text-white text-lg font-bold">- {location.value}</p>
                    <div style={{display: "none"}} className="grid grid-cols-1 xl:grid-cols-2 sm:justify-items-center">
                    { handleFilter(location.value).map((character) => (
                        <div key={character.id} className="mt-6">
                            <Character key={character.id} img={character.image} name={character.name} 
                            species={character.species} status={character.status} /> 
                        </div>
                    ))}
                    </div>
                </div>
            )) : <div className="p-20 self-center">
                    <p className="text-white font-bold italic text-2xl">Location is empty</p>
                </div>}
        </div>
    </>
  );
}

export default Location;
