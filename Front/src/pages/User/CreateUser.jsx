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
        location('/user/view');
    }

    function CreateUser() {
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const gender = document.getElementById("gender");
        const role = document.getElementById("role")
        const password = document.getElementById("password");
        if (validador.estaVazio(name.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Criar usuário falhou!',
                text: 'Por favor escreva um nome.',
            })
            return
        }
        if(validador.tamanhoTexto(name.value)){
            Swal.fire({
                icon: 'error',
                title: 'Criar usuário falhou!',
                text: 'O tamanho do nome é muito grande.',
            })
            return
        }
        if (validador.estaVazio(email.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Criar usuário falhou!',
                text: 'Por favor, escreva um e-mail.',
            })
            return
        }
        if(!validador.validarEmail(email.value)){
            Swal.fire({
                icon: 'error',
                title: 'Criar usuário falhou!',
                text: 'O e-mail deve ter @ e .com.',
            })
            return
        }
        if (validador.tamanhoTexto(email.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Criar usuário falhou!',
                text: 'O tamanho do e-mail é muito grande.',
            })
            return
        }
        if (validador.selectEstaDefault(gender)){
            Swal.fire({
                icon: 'error',
                title: 'Criar usuário falhou!',
                text: 'Selecione um gênero.',
            })
            return
        }
        if (validador.estaVazio(password.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Criar usuário falhou!',
                text: 'Por favor escreva uma senha.',
            })
            return
        }
        if (!validador.tamanhoSenha(password.value)){
            Swal.fire({
                icon: 'error',
                title: 'Criar usuário falhou!',
                text: 'A senha deve ter entre 8 e 15 caracteres.',
            })
            return
        }
        if (validador.selectEstaDefault(role)){
            Swal.fire({
                icon: 'error',
                title: 'Criar usuário falhou!',
                text: 'Selecione uma função.',
            })
            return
        }

        fetch("/user/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ name: name.value, email: email.value, gender: gender.value, password: password.value, role: role.value })
        }).then((resposta) => resposta.json()).then((data) => {
            if (data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Falha ao criar novo usuário.',
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
            <Header category="Página" title="Usuário" />
            <Campo text="Nome" id="name" placeholder="Nome" type="text" />
            <Campo text="E-mail" id="email" placeholder="E-mail" type="text" />
            <label className="text-lg font-bold dark:text-black " >Selecione um gênero</label>
            <select id="gender" defaultValue='default' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                <option value="default" disabled>Selecione uma opção:</option>
                <option value="Male">Masculino</option>
                <option value="Female">Feminino</option>
            </select>
            <div className='mt-5'>
            <label className="text-lg font-bold dark:text-black " >Selecione uma função</label>
            <select id="role" defaultValue='default' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                <option value="default" disabled>Selecione uma opção:</option>
                <option value="1">Diretor</option>
                <option value="2">Administrador</option>
                <option value="3">Solicitante</option>
            </select>

            </div>
          
            <div className='my-6'><Campo text="Senha" id="password" placeholder="*****" type={"password"} /></div>
            <div className="mt-5 mb-5 flex items-center justify-end" >
                <button style={{ backgroundColor: currentColor}} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" onClick={CreateUser}>
                    <span className='pr-1'>Criar</span>
                    <MdSend />
                </button>
            </div>
            <div>
            </div>
        </div>
    )
}
