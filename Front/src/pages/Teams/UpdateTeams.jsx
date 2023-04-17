import Campo from '../../components/Campo'
import { Header } from '../../components'
import { MdSend } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider'
import SelectMult from '../../components/Select';
import { useState } from 'react';
import { validador } from "../../utils/validador";
const Swal = require('sweetalert2')

export default function UpdateTeams() {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const { currentColor, selectMult, setSelectMult } = useStateContext();
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const group = document.getElementById("group")
    function CriaTime() {
        if (validador.estaVazio(name)) {
            Swal.fire({
                icon: 'error',
                title: 'Create Teams Failed!',
                text: 'Please write a name',
            })
            return
        }
        if (validador.tamanhoTexto(name)) {
            Swal.fire({
                icon: 'error',
                title: 'Create Teams Failed!',
                text: 'Name size is too big',
            })
            return
        }
        if (selectMult.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Create Teams Failed!',
                text: 'Please add a user',
            })
            return
        }
        if (validador.selectEstaDefault(group)) {
            Swal.fire({
                icon: 'error',
                title: 'Create Teams Failed!',
                text: 'Please select a group',
            })
            return
        }
        if (validador.estaVazio(description)) {

            Swal.fire({
                icon: 'error',
                title: 'Create Teams Failed!',
                text: 'Please write a description',
            })
            return
        }

    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Update Teams" />
            <Campo id="tituloTime" text="Team name" placeholder="Name" type={"text"} value={name} setValue={setName} />
            <SelectMult id="integrantesDoTime" dados={options} text={'Select the users'} value={selectMult} setValue={setSelectMult} />
            <div className='mt-5'><label className="text-lg font-bold dark:text-black " >Select a Group</label>
                <select id="group" defaultValue='default' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value="default" disabled selected>Select an option:</option>
                    <option value="group">Fatech</option>
                </select></div>
            <div className='my-6'> <Campo id='descriçãoTime' text="Description" placeholder="Description" type={"text"} value={description} setValue={setDescription} /></div>

            <div className="mt-5 mb-5 flex" >
                <button onClick={() => CriaTime()} style={{ backgroundColor: currentColor, position: 'absolute' }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" >
                    <span className='pr-1'>Update</span>
                    <MdSend />
                </button>
            </div>

        </div>
    );
};
