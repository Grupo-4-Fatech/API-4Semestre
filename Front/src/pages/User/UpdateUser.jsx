import React, { useEffect, useState } from 'react'
import { MdSend } from 'react-icons/md';
import Campo from '../../components/Campo'
import { Header } from '../../components'
import { useStateContext } from '../../contexts/ContextProvider'
import { useNavigate, useParams } from 'react-router-dom';
import { validador } from '../../utils/validador';
const Swal = require('sweetalert2')


export default function UpdateUser() {
  const { id } = useParams();
  const { currentColor } = useStateContext();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("default")
  const [role, setRole] = useState("default")


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
        title: 'Create User Failed!',
        text: 'Please write a name',
      })
      return
    }
    if (validador.tamanhoTexto(name.value)) {
      Swal.fire({
        icon: 'error',
        title: 'Create User Failed!',
        text: 'Name size is too big',
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
    if (!validador.validarEmail(email.value)) {
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
        text: 'Email size is too big',
      })
      return
    }
    if (validador.selectEstaDefault(role.value)) {
      Swal.fire({
        icon: 'error',
        title: 'Create User Failed!',
        text: 'Please select a role',
      })
      return
    }
    if (validador.tamanhoTexto(role.value)) {
      Swal.fire({
        icon: 'error',
        title: 'Create User Failed!',
        text: 'Role size is too big',
      })
      return
    }
    if (validador.selectEstaDefault(gender)) {
      Swal.fire({
        icon: 'error',
        title: 'Create User Failed!',
        text: 'Please select a gender',
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
          title: 'Failed to update user',
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Updated successfully',
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
      <Header category="Page" title="Update User" />
      <Campo text="Name" id="name" placeholder="Name" type={"text"} value={name} setName={setName} />
      <Campo text="Email" id="email" placeholder="Email" type={"text"} value={email} setEmail={setEmail} />
      <label className="text-lg font-bold dark:text-black " >Select a gender</label>
      <select id="gender" onChange={(e) => setGender(e.target.value)} value={gender} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
        <option value="default" disabled>Select an option:</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <div className='mt-5'>
        <label className="text-lg font-bold dark:text-black " >Select a role</label>
        <select disabled id="role" onChange={(e) => setRole(e.target.value)} value={role} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
          <option value="default" disabled >Select an option:</option>
          <option value="1">Director</option>
          <option value="2">Admin</option>
          <option value="3">Requester</option>
        </select>
      </div>
      <div className="mt-5 mb-5 flex" >
        <button style={{ backgroundColor: currentColor, position: 'absolute' }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" onClick={UpdateUser}>
          <span className='pr-1'>Update</span>
          <MdSend />
        </button>
      </div>
      <div>
      </div>
    </div>
  )
}
