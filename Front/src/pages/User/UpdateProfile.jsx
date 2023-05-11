import React, { useEffect, useState } from 'react'
import { MdSend } from 'react-icons/md';
import Campo from '../../components/Campo'
import { Header } from '../../components'
import { useStateContext } from '../../contexts/ContextProvider'
import { useNavigate } from 'react-router-dom';
import { validador } from '../../utils/validador';
import { useLanguage } from "../../contexts/contextLanguage";
import tradutorUpdateProfile from '../../utils/tradutor/tradutorUpdateProfile';
const Swal = require('sweetalert2')


export default function UpdateProfile() {
  const { currentColor } = useStateContext();
  const [id, setId] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [password, setNewPassword] = useState('')
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("default")
  const [isChecked, setIsChecked] = useState(false)
  const { language } = useLanguage();

  let location = useNavigate();
  function comeback() {
    location('/viewTicket');
  }

  function UpdateUser() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const oldPassword = document.getElementById("oldPassword");
    const gender = document.getElementById("gender");
    

    if (validador.estaVazio(name.value)) {
      Swal.fire({
        icon: 'error',
        title: tradutorUpdateProfile[language].errorTitle,
        text: tradutorUpdateProfile[language].errorNameVazio,
      })
      return
    }
    if (validador.tamanhoTexto(name.value)) {
      Swal.fire({
        icon: 'error',
        title: tradutorUpdateProfile[language].errorTitle,
        text: tradutorUpdateProfile[language].errorNameTamanho,
      })
      return
    }
    if (validador.estaVazio(email.value)) {
      Swal.fire({
        icon: 'error',
        title: tradutorUpdateProfile[language].errorTitle,
        text: tradutorUpdateProfile[language].errorEmailVazio,
      })
      return
    }
    if (!validador.validarEmail(email.value)) {
      Swal.fire({
        icon: 'error',
        title: tradutorUpdateProfile[language].errorTitle,
        text: tradutorUpdateProfile[language].errorValidarEmail,
      })
      return
    }
    if (validador.tamanhoTexto(email.value)) {
      Swal.fire({
        icon: 'error',
        title: tradutorUpdateProfile[language].errorTitle,
        text: tradutorUpdateProfile[language].errorTamanhoEmail,
      })
      return
    }
    if (validador.selectEstaDefault(gender)) {
      Swal.fire({
        icon: 'error',
        title: tradutorUpdateProfile[language].errorTitle,
        text: tradutorUpdateProfile[language].errorSelectDefaultGender,
      })
      return
    }
    if (isChecked) {
      if (validador.estaVazio(oldPassword.value)) {
        Swal.fire({
          icon: 'error',
          title: tradutorUpdateProfile[language].errorTitle,
          text: tradutorUpdateProfile[language].errorSenhaVaziaVelha,
        })
        return
      }
      if (!validador.tamanhoSenha(oldPassword.value)) {
        Swal.fire({
          icon: 'error',
          title: tradutorUpdateProfile[language].errorTitle,
          text: tradutorUpdateProfile[language].errorTamanoSenha,
        })
        return
      }
      if (validador.estaVazio(password.value)) {
        Swal.fire({
          icon: 'error',
          title: tradutorUpdateProfile[language].errorTitle,
          text: tradutorUpdateProfile[language].errorSenhaNova,
        })
        return
      }
      if (!validador.tamanhoSenha(password.value)) {
        Swal.fire({
          icon: 'error',
          title: tradutorUpdateProfile[language].errorTitle,
          text: tradutorUpdateProfile[language].errorTamanoSenha,
        })
        return
      }
      if(!validador.senhaIgual(password.value,oldPassword.value)){
        Swal.fire({
          icon: 'error',
          title: tradutorUpdateProfile[language].errorTitle,
          text: tradutorUpdateProfile[language].errorSenhasIguais,
        })
        return
      }
    }

    fetch("/user/updateProfile", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ id: id, name: name.value, gender: gender.value, email: email.value, password: password?password.value:"", oldPassword: oldPassword?oldPassword.value:"", changePassword: isChecked })
    }).then((resposta) => resposta.json()).then((data) => {
      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: tradutorUpdateProfile[language].errorTitle
          // title: data.error,
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: tradutorUpdateProfile[language].messageSucssefuly,
        }).then((result) => result.isConfirmed ? comeback() : '')

      }
    })
  }

  function getData() {

    fetch("/user/profile/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then((resposta) => resposta.json()).then((data) => {
      if (data != null) {
        setName(data.name);
        setEmail(data.email)
        setGender(data.gender)
        setId(data.id)
      }
    })

  }

  useEffect(() => { getData() }, [])
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={tradutorUpdateProfile[language].page} title={tradutorUpdateProfile[language].pageTitle} />
      <Campo text={tradutorUpdateProfile[language].nomeTitle} id="name" placeholder={tradutorUpdateProfile[language].nomePlaceholder} type={"text"} value={name} setValue={setName} />
      <Campo text={tradutorUpdateProfile[language].emailTitle} id="email" placeholder={tradutorUpdateProfile[language].emailPlaceholder} type={"text"} value={email} setValue={setEmail} />
      <label className="text-lg font-bold dark:text-black " >{tradutorUpdateProfile[language].selectTitleGender}</label>
      <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
        <option value="default" disabled>{tradutorUpdateProfile[language].selectTitleOp}</option>
        <option value="Male">{tradutorUpdateProfile[language].selectTitleGenderOp2}</option>
        <option value="Female">{tradutorUpdateProfile[language].selectTitleGenderOp3}</option>
      </select>
      <div className='mt-5'>
        <input onChange={() => setIsChecked(!isChecked)} type="checkbox" id="changePassword" />
        <label className='ml-2'>{tradutorUpdateProfile[language].alterarSenhaTitle}</label>
      </div>

      {
        isChecked ? (<>
          <div className='my-6'> <Campo text={tradutorUpdateProfile[language].senhaAntiga} id="oldPassword" placeholder={tradutorUpdateProfile[language].senhaPlaceholder} type={"password"} value={oldPassword} setValue={setOldPassword} /> </div>
          <div className='my-6'> <Campo text={tradutorUpdateProfile[language].senhaNova} id="password" placeholder={tradutorUpdateProfile[language].senhaPlaceholder} type={"password"} value={password} setValue={setNewPassword} /> </div>
        </>
        ) : (<></>)
      }

      <div className="mt-5 mb-5 flex items-center justify-end" >
        <button style={{ backgroundColor: currentColor }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" onClick={UpdateUser}>
          <span className='pr-1'>{tradutorUpdateProfile[language].buttonAtualizar}</span>
          <MdSend />
        </button>
      </div>
      <div>
      </div>
    </div>
  )
}
