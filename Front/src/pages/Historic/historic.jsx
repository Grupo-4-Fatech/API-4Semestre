import { useParams } from "react-router-dom";
import { Header } from "../../components";
import { useState, useEffect } from "react";


const Historic = () => {
    const { id } = useParams();
    const [data, setData] = useState([])
    const [title, setTitle] = useState("")
    function getData() {
        if (id) {
            fetch("/ticket/getLog/" + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then((resposta) => resposta.json()).then((res) => {
                if (res != null) {
                    var logs = []
                    res.forEach(ele => {
                        logs.push({ data: ele.date, nomeUsu: ele.userName, idAcao: parseInt(ele.action), nota: ele.nota})
                    })
                    setData(logs)
                }
            })
            fetch("/ticket/get/" + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then((resposta) => resposta.json()).then((data) => {
                if (data != null) {
                    setTitle(data.title);
                }
            })
        }
    }

    const cor = idAcao => {
        switch (idAcao) {
            case 1:
                // Criado
                return "bg-blue-500";
            case 2:
                // Aprovado risco
                return "bg-green-500";
            case 3:
                // Aprovado impacto
                return "bg-green-600"
            case 4:
                // Aprovado custo
                return "bg-green-700";
            case 5:
                // Arquivado
                return "bg-red-500";
            case 6:
                // Atualizado
                return "bg-blue-500"
            case 7:
                // Avaliado risco
                return "bg-green-500"
            case 8:
                // Avaliado impacto
                return "bg-green-600"
            case 9:
                // Avaliado custo
                return "bg-green-700"

            default:
                // Caso tenha algum id que nao bate
                return "bg-gray-500";
        }
    };
    const acao = idAcao => {
        switch (idAcao) {
            case 1:
                // Criado
                return "Criado";
            case 2:
                // Aprovado risco
                return "Aprovado risco";
            case 3:
                // Aprovado impacto
                return "Aprovado impacto"
            case 4:
                // Aprovado custo
                return "Aprovado custo";
            case 5:
                // Arquivado
                return "Arquivado";
            case 6:
                // Atualizado
                return "Atualizado"
            case 7:
                // Avaliado risco
                return "Avaliado risco";
            case 8:
                // Avaliado impacto
                return "Avaliado impacto"
            case 9:
                // Avaliado custo
                return "Avaliado custo";
            default:
                // Caso tenha algum id que nao bate
                return "bg-gray-500";
        }
    };
    useEffect(() => { getData() }, [])
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="w-760 m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Header category="Página" title={title} />
                <ol className="relative border-l border-gray-400">
                    {data.map((tiq, index) => (
                        <li key={index} className="mb-10 ml-4">
                            <div
                                className={`${cor(tiq.idAcao)} absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-600`}
                            ></div>
                            <time className="mb-1 text-sm font-semibold leading-none text-gray-500">{new Date(tiq.data).toLocaleDateString("en-US")} </time>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-900">{acao(tiq.idAcao)}</h3>
                            {tiq.idAcao>6 && <p className="text-base font-semibold text-gray-600">Nota: {tiq.nota}</p>}
                            <p className="mb-4 text-base font-semibold text-gray-600">Realizado por {tiq.nomeUsu}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </div>


    );
};

export default Historic;
