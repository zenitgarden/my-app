import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";

import CreatableSelect from 'react-select/creatable';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { charactersState, locationsState, selectedCharacterState } from "../..";

function DetailChar() {
const { id } = useParams();
const characters = useRecoilValue(charactersState);
const getCharacter = useRecoilValue(selectedCharacterState);
const setCharacters = useSetRecoilState(charactersState);
const character = getCharacter(id)

const [isLoading, setIsLoading] = useState(false);
const [value, setValue] = useState();

const locations = useRecoilValue(locationsState);
const setLocations = useSetRecoilState(locationsState);

const createOption = (label) => ({
    label,
    value: label.replace(/\W/g, ''),
});
  

const handleCreate = (inputValue) => {
    setIsLoading(true);
    const newOption = createOption(inputValue);
    setTimeout(() => {
      setIsLoading(false);
      setLocations((prev) => [...prev, newOption]);
      setValue(newOption);
    }, 1000);
   handleUpdate(newOption);
};

const handleUpdate = (inputValue) => {
    setValue(inputValue);
    const location = inputValue?.value ? inputValue.value : null;
    const newCharacters = characters.map((c) => {
        if(c.id === character.id) {
            return {
                id: c.id,
                image: c.image,
                location,
                name: c.name,
                species: c.species,
                status: c.status,
            }
        }
        return c;
    })
    setCharacters(newCharacters)
};

let statusColor = ''
switch (character.status) {
  case 'Alive':
      statusColor = 'w-3 h-3 rounded-full bg-green-600'
      break;
  case 'Dead':
      statusColor = 'w-3 h-3 rounded-full bg-red-600'
      break;
  default:
      statusColor = 'w-3 h-3 rounded-full bg-blue-600'
      break;
}
  return (
    <>  
        <Header></Header>
        <div className="flex justify-center items-center flex-col py-6 gap-4 bg-slate-950 h-fit">
            <p className="text-3xl min-[380px]:text-5xl font-bold mb-4 text-white">{character.name}</p>
            <img src={character.image} alt="img" className="w-full px-10 sm:px-0 sm:w-[300px] rounded-t-md rounded-b-none sm:rounded-md"/>
            <div className="flex gap-2 items-center text-white">
                <span className={ statusColor }></span>
                <p>{ character.status }</p>
                <span>-</span>
                <p>{ character.species }</p>
            </div>
            <div className="w-full sm:w-[300px] flex flex-col gap-2 px-10 sm:px-0">
                <p className="text-white mt-4 font-bold">Set Location</p>
                <CreatableSelect
                isClearable
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={(newValue) => handleUpdate(newValue)}
                onCreateOption={handleCreate}
                options={locations}
                value={character.location ? { key: character.location, label: character.location } : value }
                />
            </div>
        </div>
    </>
  );
}

export default DetailChar;
