import React from 'react';
import { useStateContext } from '../contexts/ContextProvider'

const Customers = () => {
    const { currentColor } = useStateContext();
    const headers = ['Title', 'Classification', 'Status', 'Edit', 'File']
    const data = ['Conexão banco de dados','Hotfix','Em fila'] 
    return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400 content-center">
            <tr>
                {headers.map((header) => 
                    <th scope="col" class="px-6 py-3"> 
                        {header}
                    </th>)}
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white hover:bg-gray-50 dark:hover:bg-gray-300 content-center">
                {data.map((dat) => 
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                            {dat}
                        </td>)}
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                    <button style={{ backgroundColor: currentColor }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">Edit</button>
                </td>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                <button className="bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">File</button>
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                </td>
                
            </tr>
        </tbody>
    </table>
</div>

    </div>
  );
};

export default Customers;