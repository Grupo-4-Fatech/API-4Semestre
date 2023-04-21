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
        console.log(nome.value);
        if (validador.estaVazio(nome.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Update Crew Failed!',
                text: 'Please write a name',
            })
            return
        }
        if (validador.tamanhoTexto(nome.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Update Crew Failed!',
                text: 'Name size is too big',
            })
            return
        }
        if (validador.estaVazio(description.value)) {

            Swal.fire({
                icon: 'error',
                title: 'Update Crew Failed!',
                text: 'Please write a description',
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
                    title: 'Updated not successful',
                })
            }
            else {

                Swal.fire({
                    icon: 'success',
                    title: 'Updated successfully',
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
            console.log(data)
            setName(data.name);
            setDescription(data.descricao);
          }
        })
    
      }
    
      useEffect(() => { getData() }, [])

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Update Group" />
            <Campo id="Titulo" text="Group name" placeholder="Write the Name" type={"text"} value={name} setValue={setName} />
            <Campo id="Desc" text="Description" placeholder="Write the description" type={"text"} value={description} setValue={setDescription} />
            <div className="mt-5 mb-5 flex" >
                <button onClick={() => updateGroup()} style={{ backgroundColor: currentColor, position: 'absolute' }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" >
                    <span className='pr-1'>Update</span>
                    <MdSend />
                </button>
            </div>
        </div>


    );
}

export default UpdateGroup;