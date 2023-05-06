import React from "react";
import { Header } from "../../components";
import { MdSend } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useStateContext } from '../../contexts/ContextProvider'
import Campo from "../../components/Campo";
import { validador } from "../../utils/validador";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const Swal = require('sweetalert2')

const UpdateGroup = () => {
    const { currentColor } = useStateContext();
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const id = useParams()
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
                title: 'Falha na atualização da equipe!',
                text: 'Por favor escreva um nome',
            })
            return
        }
        if (validador.tamanhoTexto(nome.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Falha na atualização da equipe!',
                text: 'O tamanho do nome é muito grande',
            })
            return
        }
        if (validador.estaVazio(description.value)) {

            Swal.fire({
                icon: 'error',
                title: 'Falha na atualização da equipe!',
                text: 'Por favor escreva uma descrição',
            })
            return
        }
        fetch("/group/update", {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify({id:id.id, name:nome.value, descricao:description.value})
          }).then((resposta) => resposta.json()).then((data) => {
            if (data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Atualização sem êxito',
                })
            }
            else {

                Swal.fire({
                    icon: 'success',
                    title: 'Atualizado com sucesso',
                }).then((result) => result.isConfirmed ? comeback() : '')

            }
          })
    }
    function getData() {

        fetch("/group/get/"+id.id, {
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
            <Header category="Pagina" title="Atualizar grupo" />
            <Campo id="Titulo" text="Nome do grupo" placeholder="Escreva o nome" type={"text"} value={name} setValue={setName} />
            <Campo id="Desc" text="Descrição" placeholder="Escreva a descrição" type={"text"} value={description} setValue={setDescription} />
            <div className="mt-5 mb-5 flex items-center justify-end" >
                <button onClick={() => updateGroup()} style={{ backgroundColor: currentColor }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" >
                    <span className='pr-1'>Atualizar</span>
                    <MdSend />
                </button>
            </div>
        </div>


    );
}

export default UpdateGroup;