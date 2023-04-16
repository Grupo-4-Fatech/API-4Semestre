import React, { useEffect } from 'react'
import { MdSend } from 'react-icons/md';
import Campo from '../../components/Campo'
import { Header } from '../../components'
import { useStateContext } from '../../contexts/ContextProvider'
import { useNavigate } from 'react-router-dom';
import { validador } from '../../utils/validador';
import SelectMult from '../../components/Select';
import Selecta from '../../components/sel';
const Swal = require('sweetalert2')


export default function CreateUser() {
    const { currentColor } = useStateContext();
    const options = [
        { value: 'masculino', label: 'Masculino' },
        { value: 'feminino', label: 'Feminino' }
    ]

    let location = useNavigate();
    function comeback() {
        location('/user/view');
    }

    function CreateUser() {
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const gender = document.getElementById("gender");
        const password = document.getElementById("password");


        if (validador.estaVazio(name.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Create User Failed!',
                text: 'Please write a name',
            })
            return
        }
        if (validador.estaVazio(email.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Create User Failed!',
                text: 'Please write a email',
            })
            return
        }
        if(!validador.validarEmail(email.value)){
            Swal.fire({
                icon: 'error',
                title: 'Create User Failed!',
                text: 'Email must have @ and .com',
            })
            return
        }
        if (validador.tamanhoTexto(email.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Create User Failed!',
                text: 'email size is too big',
            })
            return
        }
        if (validador.selectEstaDefault(gender)){
            Swal.fire({
                icon: 'error',
                title: 'Create User Failed!',
                text: 'Please select a gender',
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
        if (!validador.tamanhoSenha(password.value)){
            Swal.fire({
                icon: 'error',
                title: 'Create User Failed!',
                text: 'Password cannot be less than 8 and cannot be more than 15',
            })
            return
        }

        fetch("/user/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ name: name.value, email: email.value, gender: gender.value, password: password.value })
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
            <label className="text-lg font-bold dark:text-black " >Select a gender</label>
            <select id="gender" defaultValue='default' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                <option value="default" disabled selected>Select an option:</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <div className='my-6'><Campo text="Password" id="password" placeholder="*****" type={"password"} /></div>
            <div className="mt-5 mb-5 flex" >
                <button style={{ backgroundColor: currentColor, position: 'absolute' }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" onClick={CreateUser}>
                    <span className='pr-1'>Create</span>
                    <MdSend />
                </button>
            </div>
            <div>
            </div>
        </div>
    )
}
