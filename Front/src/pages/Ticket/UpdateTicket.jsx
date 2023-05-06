import React, { useEffect } from 'react'
import { MdSend } from 'react-icons/md';
import Campo from '../../components/Campo'
import Descrition from '../../components/Descrition'
import { Header } from '../../components'
import { useStateContext } from '../../contexts/ContextProvider'
import { useState } from 'react';
import { validador } from '../../utils/validador';
import { useParams, useNavigate } from 'react-router-dom';

const Swal = require('sweetalert2')

export default function UpdateTicket() {
    const { id } = useParams();
    const { currentColor } = useStateContext();
    const [hmtlString, setHtmlString] = useState("")
    const [title, setTitle] = useState("")
    const [type, setType] = useState("")
    const [status, setStatus] = useState("1")

    let location = useNavigate();
    function comeback() {
        location('/viewticket');
    }

    function UpdateTicket() {
        const titulo = document.getElementById("Titulo");
        const classification = document.getElementById("select");

        if (validador.estaVazio(titulo.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Falha no Chamado!',
                text: 'Por favor escreva um título',
            })
            return
        }
        if (validador.tamanhoTexto(titulo.value)){
            Swal.fire({
                icon: 'error',
                title: 'Falha no Chamado!',
                text: 'O tamanho do título é muito grande',
            })
            return
        }
        
        if (validador.selectEstaDefault(classification)) {
            Swal.fire({
                icon: 'error',
                title: 'Falha no Chamado!',
                text: 'Selecione uma classificação',
            })
            return
        }
        if (validador.estaVazio(hmtlString)) {
            Swal.fire({
                icon: 'error',
                title: 'Falha no Chamado!',
                text: 'Por favor, escreva uma descrição',
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
                        title: 'Atualizado sem sucesso',
                    })
                }
                else {

                    Swal.fire({
                        icon: 'success',
                        title: 'Atualizado com sucesso',
                    }).then((result) => result.isConfirmed ? comeback() : '')

                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Usuário não encontrado!',
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
            })
        }
    }

    useEffect(() => { getData() }, [])
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Update Ticket" />
            <Campo text="Title" id="Titulo" placeholder="Title" type={"text"} value={title} setValue={setTitle} />
            <label className="text-lg font-bold dark:text-black">Classification</label>
            <select id="select" onChange={(e) => setType(e.target.value)} defaultValue={type} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                <option value="default" disabled>Select an option:</option>
                <option value="1" >Hotfix</option>
                <option value="2" >Feature</option>
            </select>
            <Descrition value={hmtlString} setValue={setHtmlString} />

            <div className="mt-5 mb-5 flex items-center justify-end" >
                <button style={{ backgroundColor: currentColor }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" onClick={UpdateTicket}>
                    <span className='pr-1'>Update</span>
                    <MdSend />
                </button>
            </div>
            <div>
            </div>
        </div>
    )
}
