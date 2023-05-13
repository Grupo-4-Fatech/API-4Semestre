import { useLanguage } from "../../contexts/contextLanguage";
import { Header } from '../../components'
import { MdSend } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider'
import SelectMult from '../../components/Select';
import { useEffect, useState } from 'react';
import { validador } from "../../utils/validador";
import tradutorTree from "../../utils/tradutor/tree/tradutorTree";
const Swal = require('sweetalert2')

export default function CreateTree() {
    const { language } = useLanguage();
    const { currentColor } = useStateContext();
    const [risco, setRisco] = useState([]);
    const [custo, setCusto] = useState([]);
    const [impacto, setImpacto] = useState([]);
    const [data, setData] = useState([])





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
            } else {
                
                Swal.fire({
                    icon: 'success',
                    title: tradutorTree[language].successfulyData,
                })
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
                <button onClick={() => CriaTime()} style={{ backgroundColor: currentColor }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" >
                    <span className='pr-1'>{tradutorTree[language].criarButton}</span>
                    <MdSend />
                </button>
            </div>

        </div>
    );

}
