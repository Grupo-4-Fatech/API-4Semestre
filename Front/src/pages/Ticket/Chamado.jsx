import React, { useEffect } from 'react'
import { MdSend } from 'react-icons/md';
import Campo from '../../components/Campo'
import Descrition from '../../components/Descrition'
import { Header } from '../../components'
import { useStateContext } from '../../contexts/ContextProvider'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { validador } from '../../utils/validador';
const Swal = require('sweetalert2')


export default function Chamado() {
    const { currentColor } = useStateContext();
    const [hmtlString, setHtmlString] = useState("")
    const [title, setTitle] = useState("")
    const [type, setType] = useState("default")

    let location = useNavigate();
    function comeback() {
        location('/viewticket');
    }

    function CreateTicket() {
        const titulo = document.getElementById("Titulo");
        const classification = document.getElementById("select");

        if (validador.estaVazio(titulo.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Falha no chamado!',
                text: 'Por favor escreva um título',
            })
            return
        }
        if (validador.tamanhoTexto(titulo.value)){
            Swal.fire({
                icon: 'error',
                title: 'Falha no chamado!',
                text: 'O tamanho do título é muito grande',
            })
            return
        }
        if (validador.selectEstaDefault(classification)) {
            Swal.fire({
                icon: 'error',
                title: 'Falha no chamado!',
                text: 'Selecione uma classificação',
            })
            return
        }
        if (validador.estaVazio(hmtlString)) {
            Swal.fire({
                icon: 'error',
                title: 'Falha no chamado!',
                text: 'Por favor escreva uma descrição',
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
                    title: 'Falha ao criar novo chamado',
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Criado com sucesso',
                }).then((result) => result.isConfirmed ? comeback() : '')

            }
        })
    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Ticket" />
            <Campo text="Titulo" id="Titulo" placeholder="Titulo" type={"text"} value={title} setValue={setTitle} />
            <label className="text-lg font-bold dark:text-black">Classificação</label>
            <select id="select" onChange={(e) => setType(e.target.value)} defaultValue='default' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                <option value="default" disabled>Selecione uma opção:</option>
                <option value="1">Hotfix</option>
                <option value="2">Feature</option>
            </select>
            <Descrition value={hmtlString} setValue={setHtmlString} />

            <div className="mt-5 mb-5 flex items-center justify-end" >
                <button style={{ backgroundColor: currentColor}} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" onClick={CreateTicket}>
                    <span className='pr-1'>Enviar</span>
                    <MdSend />
                </button>
            </div>
            <div>
            </div>
        </div>
    )
}
