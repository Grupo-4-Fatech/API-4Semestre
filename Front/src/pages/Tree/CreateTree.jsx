import { useLanguage } from "../../contexts/contextLanguage";
import { Header } from '../../components'
import { MdSend } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider'
import SelectMult from '../../components/Select';
import { useEffect, useState } from 'react';
import tradutorTree from "../../utils/tradutor/tree/tradutorTree";

const Swal = require('sweetalert2')

export default function CreateTree() {
    const { language } = useLanguage();
    const { currentColor } = useStateContext();
    const [risco, setRisco] = useState([]);
    const [custo, setCusto] = useState([]);
    const [impacto, setImpacto] = useState([]);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)






    function getUser() {

        fetch("/user/getUsers", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            var users = []
            data.forEach(element => {
                users.push({
                    value: element.id,
                    label: element.name,
                })
            });
            setData(users)
        })
    }
    function getGroups() {
        fetch("/InspectionGroup/list", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            if (data) {
                let users = []
                let grupoCusto = data.filter((e) => e.name == "Grupo Custo")
                let grupoRisco = data.filter((e) => e.name == "Grupo Risco")
                let grupoImpacto = data.filter((e) => e.name == "Grupo Impacto")
                grupoCusto[0].users.forEach(element => {
                    users.push({
                        value: element.id,
                        label: element.name,
                    })
                });
                setCusto(users)
                users = []
                grupoRisco[0].users.forEach(element => {
                    users.push({
                        value: element.id,
                        label: element.name,
                    })
                });
                setRisco(users)
                users = []
                grupoImpacto[0].users.forEach(element => {
                    users.push({
                        value: element.id,
                        label: element.name,
                    })
                });
                setImpacto(users)
            }
        })
    }

    function CriaTime() {


        if (data.length === 0) {
            Swal.fire({
                icon: 'error',
                title: tradutorTree[language].errorDataTamanhoTitle,
                text: tradutorTree[language].errorDataTamanhoText,
            })
            return
        }
        var grupoImpacto = {
            name: "Grupo Impacto",
            descricao: "",
            users: impacto

        }
        var grupoRisco = {
            name: "Grupo Risco",
            descricao: "",
            users: risco

        }
        var grupoCusto = {
            name: "Grupo Custo",
            descricao: "",
            users: custo

        }
        setLoading(true);
        fetch("/InspectionGroup/update", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ grupoRisco, grupoImpacto, grupoCusto })
        }).then((resposta) => resposta.json()).then((data) => {
            if (data.error) {
                Swal.fire({
                    icon: 'error',
                    title: tradutorTree[language].errorDataUpdate,

                })
                setLoading(false);
            } else {
                Swal.fire({
                    icon: 'success',
                    title: tradutorTree[language].successfulyData,
                })
                setLoading(false);
            }

        })



    }





    useEffect(() => { getUser(); getGroups(); }, [])

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category={tradutorTree[language].page} title={tradutorTree[language].pageTitle} />
            <div>

                <div className='ml-2'>
                    <SelectMult id="integrantesDoTime" dados={data} text={tradutorTree[language].selectTextRisco} value={risco} setValue={setRisco} />

                </div>
            </div>
            <div>
                <div className='ml-2 mt-7'>
                    <SelectMult id="integrantesDoTime" dados={data} text={tradutorTree[language].selectTextImpacto} value={impacto} setValue={setImpacto} />

                </div>

            </div>
            <div>
                <div className='ml-2 mt-7'>
                    <SelectMult id="integrantesDoTime" dados={data} text={tradutorTree[language].selectTextCusto} value={custo} setValue={setCusto} />

                </div>
            </div>
            <div className="mt-5 mb-5 my-1 flex items-center justify-end " >
                <button onClick={() => CriaTime()}
                    disabled={loading === true}
                    style={{ backgroundColor: currentColor }}
                    className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" >
                    <span className='pr-1'>{loading ?
                        <div role="status">
                            <svg aria-hidden="true" class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                        :
                        tradutorTree[language].criarButton}
                    </span>
                    <MdSend />
                </button>
            </div>

        </div>
    );

}
