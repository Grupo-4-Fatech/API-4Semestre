import Campo from '../../components/Campo'
import { Header } from '../../components'
import { MdSend } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider'
import SelectMult from '../../components/Select';
import { useState } from 'react';
import { validador } from "../../utils/validador";
const Swal = require('sweetalert2')





export default function CreateTeams() {
    const options = [
        { value: '1', label: 'Antonio' },
        { value: '2', label: 'Gabriel' },
        { value: '3', label: 'Bruna' },
        { value: '4', label: 'Emerton' },
        { value: '5', label: 'LowBaixo' },
        { value: '6', label: 'Andre' },
        { value: '7', label: 'Dionísio' }

    ]

    const { currentColor } = useStateContext();
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [selectMult, setSelectMult] = useState([])
    


    function CriaTime() {
        console.log(selectMult);

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
            <Header category="Page" title="Teams" />
            <Campo id="tituloTime" text="Team name" placeholder="Name" type={"text"} value={name} setValue={setName} />
            <SelectMult id="integrantesDoTime" dados={options} text={'Select the users'} value={selectMult} setValue={setSelectMult} />
            <div className='my-6'> <Campo id='descriçãoTime' text="Description" placeholder="Description" type={"text"} value={description} setValue={setDescription} /></div>

            <div className="mt-5 mb-5 flex" >
                <button onClick={() => CriaTime()} style={{ backgroundColor: currentColor, position: 'absolute' }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" >
                    <span className='pr-1'>Create</span>
                    <MdSend />
                </button>
            </div>

        </div>
    );

}
