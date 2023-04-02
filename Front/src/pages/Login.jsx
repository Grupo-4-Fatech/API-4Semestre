import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';

export default function Login() {

    //Mode
    const { currentMode } = useStateContext();
    const logoLight = 'https://s3-sa-east-1.amazonaws.com/recrutai-dev/1647fba0-ea33-11eb-9826-8d3dd8a2a1d2/logo/1647fba0-ea33-11eb-9826-8d3dd8a2a1d2_1628785344229_54w.png'
    const logoDark = 'https://uploads-ssl.webflow.com/60dcc4691817e11aa93685ab/636cfbef568f863947dd4951_logo-color.svg'
    if (currentMode == 'Light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light')
    } else {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
    }

    //Login
    const Swal = require('sweetalert2')
    var handleSubmit = function () {
        var dados = {}
        dados.email = document.getElementById('email').value;
        dados.senha = document.getElementById('password').value
        console.log(dados)
        fetch("/Logar", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dados)
        }).then((resposta) => resposta.json()).then((data) => {

            if (data.ok) {
                window.location.href = '/app'
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Incorrect Login!',
                    text: 'Login or password are wrong.',
                })
            }
        })
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    {currentMode === 'Light' ? (
                        <img className="w-18 h-12 mr-2" src={logoLight} alt="logo" />
                    ) : (<img className="w-18 h-18 mr-2" src={logoDark} alt="logo" />)}
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" id="password" name="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-gray-200">Forgot password?</a>
                            </div>
                            <button type="submit" onClick={handleSubmit} className="w-full text-white bg-cyan-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-cyan-700 active:bg-cyan-700">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
