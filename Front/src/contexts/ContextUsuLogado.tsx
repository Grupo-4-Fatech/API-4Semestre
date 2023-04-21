import React, { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "../types";

const Autenticacao = createContext({} as UserContext)

export default function AutenticacaoProvider({ children }) {
  function profileUser() {
    fetch("/user/profile", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then((resposta) => resposta.json()).then((user) => {
      setUsuario(user)
      localStorage.setItem('user', JSON.stringify(user));
    })
  }
  const [usuario, setUsuario] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user')||"{}");
    return user || {};
  })

  useEffect(() => {
    profileUser()
  }, []);

  
  return <Autenticacao.Provider value={{ usuario, setUsuario }}> {children} </Autenticacao.Provider>


}

export function useAutenticacao() {
  const context = useContext(Autenticacao)
  if (!context) throw new Error("useAutenticacao must be use within a AutenticacaoProvider")
  const { usuario, setUsuario } = context;
  return { usuario, setUsuario };
}