import React, { useEffect } from 'react'
import { MdSend } from 'react-icons/md';
import Campo from '../../components/Campo'
import Descrition from '../../components/Descrition'
import { Header } from '../../components'
import { useStateContext } from '../../contexts/ContextProvider'
import { useState } from 'react';
import { validador } from '../../utils/validador';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from "../../contexts/contextLanguage";
import translationsUpdateChamado from '../../utils/tradutor/ticket/tradutorUpdateChamado';


const Swal = require('sweetalert2')

export default function UpdateTicket() {
    const { id } = useParams();
    const { currentColor } = useStateContext();
    const [hmtlString, setHtmlString] = useState("")
    const [title, setTitle] = useState("")
    const [type, setType] = useState("")
    const [status, setStatus] = useState("1")
    const { language } = useLanguage();


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
                title: translationsUpdateChamado[language].errorTitle,
                text: translationsUpdateChamado[language].errorVazioText,
            })
            return
        }
        if (validador.tamanhoTexto(titulo.value)){
            Swal.fire({
                icon: 'error',
                title: translationsUpdateChamado[language].errorTitle,
                text: translationsUpdateChamado[language].errorTitleLength,
            })
            return
        }
        
        if (validador.selectEstaDefault(classification)) {
            Swal.fire({
                icon: 'error',
                title: translationsUpdateChamado[language].errorTitle,
                text: translationsUpdateChamado[language].errorSelectDefault,
            })
            return
        }
        if (validador.estaVazio(hmtlString)) {
            Swal.fire({
                icon: 'error',
                title: translationsUpdateChamado[language].errorTitle,
                text: translationsUpdateChamado[language].errorVazioDescricao,
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
                        title: translationsUpdateChamado[language].errorTitle,
                    })
                }
                else {

                    Swal.fire({
                        icon: 'success',
                        title: translationsUpdateChamado[language].sucssesMessage,
                    }).then((result) => result.isConfirmed ? comeback() : '')

                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: translationsUpdateChamado[language].errorUsu,
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
            <Header category={translationsUpdateChamado[language].page} title={translationsUpdateChamado[language].pageTitle} />
            <Campo text={translationsUpdateChamado[language].ticketTitle} id="Titulo" placeholder={translationsUpdateChamado[language].ticketTitlePlaceholder} type={"text"} value={title} setValue={setTitle} />
            <label className="text-lg font-bold dark:text-black">{translationsUpdateChamado[language].selectName}</label>
            <select id="select" onChange={(e) => setType(e.target.value)} value={type} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                <option value="default" disabled>{translationsUpdateChamado[language].selectNameOption}:</option>
                <option value="1" >Hotfix</option>
                <option value="2" >Feature</option>
            </select>
            <Descrition nome={translationsUpdateChamado[language].selectNameOption} descricao={translationsUpdateChamado[language].descriptionPlaceholder} value={hmtlString} setValue={setHtmlString} />

            <div className="mt-5 mb-5 flex items-center justify-end" >
                <button style={{ backgroundColor: currentColor }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" onClick={UpdateTicket}>
                    <span className='pr-1'>{translationsUpdateChamado[language].buttonSend}</span>
                    <MdSend />
                </button>
            </div>
            <div>
            </div>
        </div>
    )
}
