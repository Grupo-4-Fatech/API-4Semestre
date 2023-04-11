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
  const [password, setPassword] = useState("")

  let location = useNavigate();
  function comeback() {
    location('/viewuser');
  }

  function UpdateUser() {
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
    if (validador.estaVazio(email.value)) {
      Swal.fire({
        icon: 'error',
        title: 'Create User Failed!',
        text: 'Please write a email',
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
    if (validador.estaVazio(password.value)) {
      Swal.fire({
        icon: 'error',
        title: 'Create User Failed!',
        text: 'Please write a password',
      })
      return
    }

    fetch("/user/update", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ id: id, name: name, email: email, password: password })
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
          setPassword(data.password)
        }
      })
    }
  }

  useEffect(() => { getData() }, [])
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="User" />
      <Campo text="Name" id="name" placeholder="Name" type={"text"} value={name} setName={setName} />
      <Campo text="Email" id="email" placeholder="Email" type={"text"} value={email} setEmail={setEmail} />
      <Campo text="Password" id="password" placeholder="*****" type={"password"} value={password} setPassword={setPassword} />

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
