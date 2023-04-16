import { useStateContext } from '../../contexts/ContextProvider'




const ViewCrew = () => {
    const { currentColor } = useStateContext();
    const headers = ['Crew Name', 'Description','Edit','Delete']
    const teste = [
        {id: 1, nome: 'abc', descricao: "teste"},
        {id: 2, nome: 'asd', descricao: "teste2"}
    ]
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                        <path
                            d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                        </path>
                    </svg>
                </span>
                <input placeholder="Search"
                    className="appearance-none rounded-r-lg border border-gray-400 border-b block pl-8 pr-6 py-2 w-44 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400 content-center">
                        <tr>
                            {headers.map((header) =>
                                <th scope="col" className="px-6 py-3" key={header}>
                                    {header}
                                </th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {teste.map(dat => {
                            return (
                                <tr key={dat.id} className="bg-white hover:bg-gray-50 dark:hover:bg-gray-300 content-center">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        {dat.nome}
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        {dat.descricao}
                                    </td>

                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        <button style={{ backgroundColor: currentColor }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">Edit</button>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        <button  className="bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">Delete</button>
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewCrew;