import React, { useEffect } from 'react'
import { MdSend } from 'react-icons/md';
import Campo from '../../components/Campo'
import { Header } from '../../components'
import { useStateContext } from '../../contexts/ContextProvider'
import { useNavigate } from 'react-router-dom';
import { validador } from '../../utils/validador';
import { useLanguage } from "../../contexts/contextLanguage";
import tradutorCriarUsu from '../../utils/tradutor/user/tradutorCriarUsu';

const Swal = require('sweetalert2')


export default function CreateUser() {
    const { currentColor } = useStateContext();
    const { language } = useLanguage();


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
                title: tradutorCriarUsu[language].errorTitle,
                text: tradutorCriarUsu[language].errorNameVazio,
            })
            return
        }
        if(validador.tamanhoTexto(name.value)){
            Swal.fire({
                icon: 'error',
                title: tradutorCriarUsu[language].errorTitle,
                text: tradutorCriarUsu[language].errorNameTamanho,
            })
            return
        }
        if (validador.estaVazio(email.value)) {
            Swal.fire({
                icon: 'error',
                title: tradutorCriarUsu[language].errorTitle,
                text: tradutorCriarUsu[language].errorEmailVazio,
            })
            return
        }
        if(!validador.validarEmail(email.value)){
            Swal.fire({
                icon: 'error',
                title: tradutorCriarUsu[language].errorTitle,
                text: tradutorCriarUsu[language].errorValidarEmail,
            })
            return
        }
        if (validador.tamanhoTexto(email.value)) {
            Swal.fire({
                icon: 'error',
                title: tradutorCriarUsu[language].errorTitle,
                text: tradutorCriarUsu[language].errorTamanhoEmail,
            })
            return
        }
        if (validador.selectEstaDefault(gender)){
            Swal.fire({
                icon: 'error',
                title: tradutorCriarUsu[language].errorTitle,
                text: tradutorCriarUsu[language].errorSelectDefaultGender,
            })
            return
        }
        if (validador.estaVazio(password.value)) {
            Swal.fire({
                icon: 'error',
                title: tradutorCriarUsu[language].errorTitle,
                text: tradutorCriarUsu[language].errorSenhaVazia,
            })
            return
        }
        if (!validador.tamanhoSenha(password.value)){
            Swal.fire({
                icon: 'error',
                title: tradutorCriarUsu[language].errorTitle,
                text: tradutorCriarUsu[language].errorTamanoSenha,
            })
            return
        }
        if (validador.selectEstaDefault(role)){
            Swal.fire({
                icon: 'error',
                title: tradutorCriarUsu[language].errorTitle,
                text: tradutorCriarUsu[language].errorSelectDefaultRole,
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
                    title: tradutorCriarUsu[language].errorTitle,
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: tradutorCriarUsu[language].messageSucssefuly,
                }).then((result) => result.isConfirmed ? comeback() : '')

            }
        })
    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category={tradutorCriarUsu[language].page} title={tradutorCriarUsu[language].pageTitle} />
            <Campo text={tradutorCriarUsu[language].nomeTitle} id="name" placeholder={tradutorCriarUsu[language].nomePlaceholder} type="text" />
            <Campo text={tradutorCriarUsu[language].emailTitle} id="email" placeholder={tradutorCriarUsu[language].emailPlaceholder} type="text" />
            <label className="text-lg font-bold dark:text-black " >{tradutorCriarUsu[language].selectTitleGender}</label>
            <select id="gender" defaultValue='default' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                <option value="default" disabled>{tradutorCriarUsu[language].selectTitleOp}</option>
                <option value="Male">{tradutorCriarUsu[language].selectTitleGenderOp2}</option>
                <option value="Female">{tradutorCriarUsu[language].selectTitleGenderOp3}</option>
            </select>
            <div className='mt-5'>
            <label className="text-lg font-bold dark:text-black " >{tradutorCriarUsu[language].selectTitleRole}</label>
            <select id="role" defaultValue='default' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                <option value="default" disabled>{tradutorCriarUsu[language].selectTitleOp}</option>
                <option value="1">{tradutorCriarUsu[language].selectTitleRoleOp2}</option>
                <option value="2">{tradutorCriarUsu[language].selectTitleRoleOp3}</option>
                <option value="3">{tradutorCriarUsu[language].selectTitleRoleOp4}</option>
            </select>

            </div>
          
            <div className='my-6'><Campo text={tradutorCriarUsu[language].senhaTitulo} id="password" placeholder={tradutorCriarUsu[language].senhaPlaceholder} type={"password"} /></div>
            <div className="mt-5 mb-5 flex items-center justify-end" >
                <button style={{ backgroundColor: currentColor}} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" onClick={CreateUser}>
                    <span className='pr-1'>{tradutorCriarUsu[language].buttonCriar}</span>
                    <MdSend />
                </button>
            </div>
            <div>
            </div>
        </div>
    )
}
