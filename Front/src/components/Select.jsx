import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animated = makeAnimated()
function SelectMult({ dados, text }) {
  return (
    <>
      <label className="text-lg font-bold dark:text-black " >{text}</label>
      <Select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" 
      isMulti = {true}
      isClearable = {true}
      isSearchable = {true}
      closeMenuOnSelect= {false}
      components={animated}    
      options={dados} />
    </>
  )
}
export default SelectMult;