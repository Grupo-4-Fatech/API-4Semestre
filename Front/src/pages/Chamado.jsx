import React, { useEffect } from 'react'
import { MdSend } from 'react-icons/md';
import Campo from '../components/Campo'
import Descrition from '../components/Descrition'
import { Header } from '../components'
import { useStateContext } from '../contexts/ContextProvider'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { validador } from '../utils/validador';
const Swal = require('sweetalert2')


export default function Chamado() {
    const { currentColor } = useStateContext();
    const [hmtlString, setHtmlString] = useState("")
    const [title, setTitle] = useState("")
    const [type, setType] = useState("default")

    let location = useNavigate();
    function comeback() {
        location(-1);
    }

    function CreateTicket() {
        const titulo = document.getElementById("Titulo");
        const classification = document.getElementById("select");

        if (validador.estaVazio(titulo.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Ticket Failed!',
                text: 'Please write a title',
            })
            return
        }
        if (validador.selectEstaDefault(classification)) {
            Swal.fire({
                icon: 'error',
                title: 'Ticket Failed!',
                text: 'Please select a classification',
            })
            return
        }
        if (validador.estaVazio(hmtlString)) {
            Swal.fire({
                icon: 'error',
                title: 'Ticket Failed!',
                text: 'Please write a description',
            })
            return
        }

        fetch("/ticket/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ type: type, title: title, description: hmtlString, status: 1 })
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
                }).then((result) => result.isConfirmed ? comeback() : '')

            }
        })
    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Ticket" />
            <Campo text="Title" id="Titulo" placeholder="Title" type={"text"} value={title} setValue={setTitle} />
            <label className="text-lg font-bold dark:text-black">Classification</label>
            <select id="select" onChange={(e) => setType(e.target.value)} defaultValue='default' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                <option value="default" disabled>Select an option:</option>
                <option value="1">Hotfix</option>
                <option value="2">Feature</option>
            </select>
            <Descrition value={hmtlString} setValue={setHtmlString} />

            <div className="mt-5 mb-5 flex" >
                <button style={{ backgroundColor: currentColor, position: 'absolute' }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" onClick={CreateTicket}>
                    <span className='pr-1'>Send</span>
                    <MdSend />
                </button>
            </div>
            <div>
            </div>
        </div>
    )
}
