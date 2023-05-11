import React, { useEffect, useState } from 'react'
import { MdSend } from 'react-icons/md';
import Campo from '../../components/Campo'
import { Header } from '../../components'
import { useStateContext } from '../../contexts/ContextProvider'
import { useNavigate, useParams } from 'react-router-dom';
import { validador } from '../../utils/validador';
import tradutorUpdateUser from '../../utils/tradutor/tradutorUpdateUser';
import { useLanguage } from "../../contexts/contextLanguage";
const Swal = require('sweetalert2')


export default function UpdateUser() {
  const { id } = useParams();
  const { currentColor } = useStateContext();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("default")
  const [role, setRole] = useState("default")
  const { language } = useLanguage();



  let location = useNavigate();
  function comeback() {
    location('/user/view');
  }

  function UpdateUser() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const gender = document.getElementById("gender");
    const role = document.getElementById("role")

    if (validador.estaVazio(name.value)) {
      Swal.fire({
        icon: 'error',
        title: tradutorUpdateUser[language].errorTitle,
        text: tradutorUpdateUser[language].errorNameVazio,
      })
      return
    }
    if (validador.tamanhoTexto(name.value)) {
      Swal.fire({
        icon: 'error',
        title: tradutorUpdateUser[language].errorTitle,
        text: tradutorUpdateUser[language].errorNameTamanho,
      })
      return
    }
    if (validador.estaVazio(email.value)) {
      Swal.fire({
        icon: 'error',
        title: tradutorUpdateUser[language].errorTitle,
        text: tradutorUpdateUser[language].errorEmailVazio,
      })
      return
    }
    if (!validador.validarEmail(email.value)) {
      Swal.fire({
        icon: 'error',
        title: tradutorUpdateUser[language].errorTitle,
        text: tradutorUpdateUser[language].errorValidarEmail,
      })
      return
    }
    if (validador.tamanhoTexto(email.value)) {
      Swal.fire({
        icon: 'error',
        title: tradutorUpdateUser[language].errorTitle,
        text: tradutorUpdateUser[language].errorTamanhoEmail,
      })
      return
    }
    if (validador.selectEstaDefault(role.value)) {
      Swal.fire({
        icon: 'error',
        title: tradutorUpdateUser[language].errorTitle,
        text: tradutorUpdateUser[language].errorSelectDefaultRole,
      })
      return
    }
    if (validador.selectEstaDefault(gender)) {
      Swal.fire({
        icon: 'error',
        title: tradutorUpdateUser[language].errorTitle,
        text: tradutorUpdateUser[language].errorSelectDefaultGender,
      })
      return
    }


    fetch("/user/update", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ id: id, name: name.value, email: email.value, gender: gender.value, role: role.value })
    }).then((resposta) => resposta.json()).then((data) => {
      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: tradutorUpdateUser[language].errorTitle,
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: tradutorUpdateUser[language].messageSucssefuly,
        }).then((result) => result.isConfirmed ? comeback() : '')

      }
    })
  }

  function getData() {
    if (id) {
      fetch("/user/get/" + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then((resposta) => resposta.json()).then((data) => {
        if (data != null) {
          setName(data.name);
          setEmail(data.email)
          setGender(data.gender)
          setRole(data.role)
        }
      })
    }
  }

  useEffect(() => { getData() }, [])
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={tradutorUpdateUser[language].page} title={tradutorUpdateUser[language].pageTitle}/>
      <Campo text={tradutorUpdateUser[language].nomeTitle} id="name" placeholder={tradutorUpdateUser[language].nomePlaceholder} type={"text"} value={name} setValue={setName} />
      <Campo text={tradutorUpdateUser[language].emailTitle} id="email" placeholder={tradutorUpdateUser[language].emailPlaceholder} type={"text"} value={email} setValue={setEmail} />
      <label className="text-lg font-bold dark:text-black " >{tradutorUpdateUser[language].selectTitleGender}</label>
      <select id="gender" onChange={(e) => setGender(e.target.value)} value={gender} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
        <option value="default" disabled>{tradutorUpdateUser[language].selectTitleOp}</option>
        <option value="Male">{tradutorUpdateUser[language].selectTitleGenderOp2}</option>
        <option value="Female">{tradutorUpdateUser[language].selectTitleGenderOp3}</option>
      </select>
      <div className='mt-5'>
        <label className="text-lg font-bold dark:text-black " >{tradutorUpdateUser[language].selectTitleRole}</label>
        <select disabled id="role" onChange={(e) => setRole(e.target.value)} value={role} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
          <option value="default" disabled >{tradutorUpdateUser[language].selectTitleOp}</option>
          <option value="1">{tradutorUpdateUser[language].selectTitleRoleOp2}</option>
          <option value="2">{tradutorUpdateUser[language].selectTitleRoleOp3}</option>
          <option value="3">{tradutorUpdateUser[language].selectTitleRoleOp4}</option>
        </select>
      </div>
      <div className="mt-5 mb-5 flex items-center justify-end" >
        <button style={{ backgroundColor: currentColor}} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" onClick={UpdateUser}>
          <span className='pr-1'>{tradutorUpdateUser[language].buttonAtualizar}</span>
          <MdSend />
        </button>
      </div>
      <div>
      </div>
    </div>
  )
}
