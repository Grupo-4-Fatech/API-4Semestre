import React, { useEffect } from 'react'
import { MdSend } from 'react-icons/md';
import Campo from '../components/Campo'
import Descrition from '../components/Descrition'
import { Header } from '../components'
import { useStateContext } from '../contexts/ContextProvider'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { validador } from '../utils/validador';
const Swal = require('sweetalert2')


export default function Chamado() {
    const { currentColor } = useStateContext();
    const [hmtlString, setHtmlString] = useState("")
    const [title, setTitle] = useState("")
    const [type, setType] = useState("default")
    const [button, setButton] = useState("Send")
    const [status, setStatus] = useState("1")
    const { id } = useParams();
    function CreateTicket(e) {
        const titulo = document.getElementById("Titulo");
        if (validador.estaVazio(titulo.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Something is worng',
                text: 'Please write the title',
            })
            return
        }
        const classification = document.getElementById("select")
        if (validador.selectEstaDefault(classification)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Select a classification',
            })
            return
        }
        if (validador.estaVazio(hmtlString)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please write or put a image',
            })
            return
        }
        if (id) {
            fetch("/ticket/update", {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ id: id, type: type, title: title, description: hmtlString, status: status })
            }).then((resposta) => resposta.json()).then((data) => {
                if (data.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Updated not successful',
                    })
                }
                else {

                    Swal.fire({
                        icon: 'success',
                        title: 'Updated successfully',
                    })

                }
            })

        } else {
            fetch("/ticket/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ type: type, title: title, description: hmtlString, status: status })
            }).then((resposta) => resposta.json()).then((data) => {
                if (data.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to create new ticket',
                    })
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Created successfully',
                    })

                }
            })
        }
    }

    function getData() {
        if (id) {
            fetch("/ticket/get/" + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then((resposta) => resposta.json()).then((data) => {
                if (data != null) {
                    setTitle(data.title);
                    setHtmlString(data.description)
                    setType(data.type)
                    setStatus(data.status)
                }
                setButton("Update")
            })
        }
    }
    useEffect(() => { getData() }, [])
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Ticket" />
            <Campo text="Title" id="Titulo" placeholder="Title" type={"text"} value={title} setValue={setTitle} />
            <label className="text-lg font-bold dark:text-black">Classification</label>
            <select id="select" onChange={(e) => setType(e.target.value)} defaultValue={type} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                <option value="default" disabled>Select an option:</option>
                <option value="1" selected={type === "1"} >Hotfix</option>
                <option value="2" selected={type === "2"}>Feature</option>
            </select>
            <Descrition value={hmtlString} setValue={setHtmlString} />

            <div className="mt-5 mb-5 flex" >
                <button style={{ backgroundColor: currentColor, position: 'absolute' }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" onClick={CreateTicket}>
                    <span className='pr-1'>{button}</span>
                    <MdSend />
                </button>
            </div>
            <div>
            </div>
        </div>
    )
}
