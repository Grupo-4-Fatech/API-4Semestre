

function Select({dados, text}) {
  return (
    <>
    <div >
      <label className="text-lg font-bold dark:text-black " >{text}</label>
      <select className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 " defaultValue={'default'} required>
        <option className="" value="default" disabled>select user:</option>
        {dados.map(element => {
          return (<option className="font-semibold dark:text-black p-2.5" > {element} </option>)
        })}
        </select>
      </div>
    </>
  )
}
export default Select;