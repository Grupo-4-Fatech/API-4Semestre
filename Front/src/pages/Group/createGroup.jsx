import React from "react";
import { Header } from "../../components";
import { MdSend } from 'react-icons/md';
import { useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider'
import Campo from "../../components/Campo";
import { validador } from "../../utils/validador";
import { useNavigate } from 'react-router-dom';
const Swal = require('sweetalert2')

const CreateGroup = () => {
    const { currentColor } = useStateContext();
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    let location = useNavigate();
    function comeback() {
        location("/group/viewGroup")
    }

    function createGroup() {
        const nome = document.getElementById("Titulo")
        const description = document.getElementById("Desc")
        if (validador.estaVazio(nome.value)) {

            Swal.fire({
                icon: 'error',
                title: 'Falha ao criar o Grupo!',
                text: 'Por favor escreva um nome.',
            })
            return
        }
        if (validador.tamanhoTexto(nome.value)){
            Swal.fire({
                icon: 'error',
                title: 'Falha ao criar o Grupo!',
                text: 'O tamanho do nome é muito grande.',
            })
            return
        }
        if (validador.estaVazio(description.value)) {

            Swal.fire({
                icon: 'error',
                title: 'Falha ao criar o Grupo!',
                text: 'Por favor escreva uma descrição.',
            })
            return
        }

        fetch("/group/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ name: nome.value, descricao:description.value })
        }).then((resposta) => resposta.json()).then((data) => {
            if (data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Falha ao criar novo grupo.',
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Criado com sucesso.',
                }).then((result) => result.isConfirmed ? comeback() : '')

            }
        })
    }


    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Página" title="Criar grupo" />
            <Campo id="Titulo" text="Nome do grupo" placeholder="Escreva o nome" type={"text"} value={name} setValue={setName} />
            <Campo id="Desc" text="Descrição" placeholder="Escreva a descrição" type={"text"} value={description} setValue={setDescription} />
            <div className="mt-5 mb-5 flex items-center justify-end" >
                <button onClick={() => createGroup()} style={{ backgroundColor: currentColor }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" >
                    <span className='pr-1'>Criar</span>
                    <MdSend />
                </button>
            </div>
        </div>


    );
}

export default CreateGroup;