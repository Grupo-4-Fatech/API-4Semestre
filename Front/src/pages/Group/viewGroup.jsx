import { useStateContext } from '../../contexts/ContextProvider'
import { Header } from "../../components";
import { useState , useEffect} from 'react';
const Swal = require('sweetalert2')
const ViewGroup = () => {
    const { currentColor } = useStateContext();
    const headers = ['Group Name', 'Edit', 'Delete']
    const [data, setData] = useState([])

    function getData() {
        fetch("/group/list", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            var group = []
            data.forEach(element => {
                group.push({
                    id: element.id,
                    nome: element.name
                 })
            });
            setData(group)
        })
    }
    function deleteGroup(id) {
        fetch("/group/delete", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id:id})
        }).then((res) => res.json()).then((response) => {
            if (response.driverError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Group not deleted',
                })
            }
            else {

                Swal.fire({
                    icon: 'success',
                    title: 'Group deleted successfully',
                })
                var updateData = data.filter(item => item.id != id)
                setData(updateData)
            }
        })

    }
    useEffect(() => {
        getData();

    }, [])
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="View Group" />
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
                        {data.map(dat => {
                            return (
                                <tr key={dat.id} className="bg-white hover:bg-gray-50 dark:hover:bg-gray-300 content-center">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        {dat.nome}
                                    </td>                           
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        <button style={{ backgroundColor: currentColor }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" onClick={()=> window.location.href ="/group/update/"+ dat.id}>Edit</button>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        <button className="bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" onClick={()=>deleteGroup(dat.id)}>Delete</button>
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

export default ViewGroup;