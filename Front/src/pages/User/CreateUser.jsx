import React, { useEffect } from 'react'
import { MdSend } from 'react-icons/md';
import Campo from '../../components/Campo'
import { Header } from '../../components'
import { useStateContext } from '../../contexts/ContextProvider'
import { useNavigate } from 'react-router-dom';
import { validador } from '../../utils/validador';
const Swal = require('sweetalert2')


export default function CreateUser() {
    const { currentColor } = useStateContext();

    let location = useNavigate();
    function comeback() {
        location('/viewuser');
    }

    function CreateTicket() {
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const password = document.getElementById("password");

        if (validador.estaVazio(name.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Create User Failed!',
                text: 'Please write a name',
            })
            return
        }
        if (validador.estaVazio(email.value)){
            Swal.fire({
                icon: 'error',
                title: 'Create User Failed!',
                text: 'Please write a email',
            })
            return
        }
        if (validador.tamanhoTexto(email.value)){
            Swal.fire({
                icon: 'error',
                title: 'Create User Failed!',
                text: 'email size is too big',
            })
            return
        }
        if (validador.estaVazio(password.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Create User Failed!',
                text: 'Please write a password',
            })
            return
        }
        
        fetch("/user/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ name: name, email: email, password: password })
        }).then((resposta) => resposta.json()).then((data) => {
            if (data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to create new user',
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
            <Header category="Page" title="User" />
            <Campo text="Name" id="name" placeholder="Name" type={"text"} />
            <Campo text="Email" id="email" placeholder="Email" type={"text"} />
            <Campo text="Password" id="password" placeholder="*****" type={"password"} />

            <div className="mt-5 mb-5 flex" >
                <button style={{ backgroundColor: currentColor, position: 'absolute' }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" onClick={CreateTicket}>
                    <span className='pr-1'>Create</span>
                    <MdSend />
                </button>
            </div>
            <div>
            </div>
        </div>
    )
}
