import React, { KeyboardEventHandler, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated'
import translationsChamado from '../utils/tradutor/ticket/tradutorCriarChamado';
import { useLanguage } from "../contexts/contextLanguage";


const components = {
  DropdownIndicator: null,
};

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});
const animated = makeAnimated()
const Interessados = ({ texto }) => {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState<readonly Option[]>([]);
  const { language } = useLanguage();

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue('');
        event.preventDefault();
    }
  };
  console.log(value);
  
  return (
    <>
      <label className="text-lg font-bold dark:text-black " >{texto}</label>
      <CreatableSelect
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        components={animated}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(newValue) => setValue(newValue)}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        placeholder= {translationsChamado[language].interessadosPlaceholder}
        value={value}
      />
    </>
  );
};

export default Interessados;
