import React from "react";
import { Header } from "../../components";
import { MdSend } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useStateContext } from '../../contexts/ContextProvider'
import Campo from "../../components/Campo";
import { validador } from "../../utils/validador";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "../../contexts/contextLanguage";
import tradutorUpdateGroup from "../../utils/tradutor/group/tradutorUpdateGroup";

const Swal = require('sweetalert2')

const UpdateGroup = () => {
    const { currentColor } = useStateContext();
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const id = useParams()
    const { language } = useLanguage();

    let location = useNavigate();
    function comeback() {
        location("/group/viewGroup")
    }

    function updateGroup() {
        const nome = document.getElementById("Titulo")
        const description = document.getElementById("Desc")
        if (validador.estaVazio(nome.value)) {
            Swal.fire({
                icon: 'error',
                title: tradutorUpdateGroup[language].errorMessage,
                text: tradutorUpdateGroup[language].emptyNameMessage,
            })
            return
        }
        if (validador.tamanhoTexto(nome.value)) {
            Swal.fire({
                icon: 'error',
                title: tradutorUpdateGroup[language].errorMessage,
                text: tradutorUpdateGroup[language.largeNameMessage],
            })
            return
        }
        if (validador.estaVazio(description.value)) {

            Swal.fire({
                icon: 'error',
                title: tradutorUpdateGroup[language].errorMessage,
                text: tradutorUpdateGroup[language].emptyDescriptionMessage,
            })
            return
        }
        fetch("/group/update", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ id: id.id, name: nome.value, descricao: description.value })
        }).then((resposta) => resposta.json()).then((data) => {
            if (data.error) {
                Swal.fire({
                    icon: 'error',
                    title: tradutorUpdateGroup[language].errorMessage,
                })
            }
            else {

                Swal.fire({
                    icon: 'success',
                    title: tradutorUpdateGroup[language].successMessage,
                }).then((result) => result.isConfirmed ? comeback() : '')

            }
        })
    }
    function getData() {

        fetch("/group/get/" + id.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            if (data != null) {
                setName(data.name);
                setDescription(data.descricao);
            }
        })

    }

    useEffect(() => { getData() }, [])

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category={tradutorUpdateGroup[language].page} title={tradutorUpdateGroup[language].pageTitle} />
            <Campo id="Titulo" text={tradutorUpdateGroup[language].groupName} placeholder={tradutorUpdateGroup[language].groupNamePlaceholder} type={"text"} value={name} setValue={setName} />
            <Campo id="Desc" text={tradutorUpdateGroup[language].groupDescription} placeholder={tradutorUpdateGroup[language].groupDescriptionPlaceholder} type={"text"} value={description} setValue={setDescription} />
            <div className="mt-5 mb-5 flex items-center justify-end" >
                <button onClick={() => updateGroup()} style={{ backgroundColor: currentColor }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" >
                    <span className='pr-1'>{tradutorUpdateGroup[language].editButton}</span>
                    <MdSend />
                </button>
            </div>
        </div>


    );
}

export default UpdateGroup;