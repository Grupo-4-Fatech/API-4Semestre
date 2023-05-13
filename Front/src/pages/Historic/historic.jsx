import { useParams } from "react-router-dom";
import { Header } from "../../components";
import { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/contextLanguage";
import tradutorHistorico from "../../utils/tradutor/historic/tradutorHitorico";



const Historic = () => {
    const { id } = useParams();
    const [data, setData] = useState([])
    const [title, setTitle] = useState("")
    const { language } = useLanguage();

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
                return "bg-purple-500"
            case 7:
                // Avaliado risco
                return "bg-cyan-500"
            case 8:
                // Avaliado impacto
                return "bg-cyan-600"
            case 9:
                // Avaliado custo
                return "bg-cyan-700"

            default:
                // Caso tenha algum id que nao bate
                return "bg-gray-500";
        }
    };
    const acao = idAcao => {
        switch (idAcao) {
            case 1:
                // Criado
                return tradutorHistorico[language].idAcaoCriado;
            case 2:
                // Aprovado risco
                return tradutorHistorico[language].idAcaoAprovadoRisco;
            case 3:
                // Aprovado impacto
                return tradutorHistorico[language].idAcaoAprovadoImpacto
            case 4:
                // Aprovado custo
                return tradutorHistorico[language].idAcaoAprovadoCusto;
            case 5:
                // Arquivado
                return tradutorHistorico[language].idAcaoArquivado;
            case 6:
                // Atualizado
                return tradutorHistorico[language].idAcaoAtualizado
            case 7:
                // Avaliado risco
                return tradutorHistorico[language].idAcaoAtualizadoRisco;
            case 8:
                // Avaliado impacto
                return tradutorHistorico[language].idAcaoAtualizadoImpacto
            case 9:
                // Avaliado custo
                return tradutorHistorico[language].idAcaoAtualizadoCusto;
            default:
                // Caso tenha algum id que nao bate
                return "bg-gray-500";
        }
    };
    useEffect(() => { getData() }, [])
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="w-760 m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Header category={tradutorHistorico[language].page} title={title} />
                <ol className="relative border-l border-gray-400">
                    {data.map((tiq, index) => (
                        <li key={index} className="mb-10 ml-4">
                            <div
                                className={`${cor(tiq.idAcao)} absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-600`}
                            ></div>
                            <time className="mb-1 text-sm font-semibold leading-none text-gray-500">{new Date(tiq.data).toLocaleDateString("en-US")} </time>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-900">{acao(tiq.idAcao)}</h3>
                            {tiq.idAcao>6 && <p className="text-base font-semibold text-gray-600">{tradutorHistorico[language].nota} {tiq.nota}</p>}
                            <p className="mb-4 text-base font-semibold text-gray-600">{tradutorHistorico[language].realizado} {tiq.nomeUsu}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </div>


    );
};

export default Historic;
