import { Header } from "../../components";
import TimeLine from "../../components/timeLine";


const Historic = () => {
    const tiquete = [
        { data: '12/12/12', tipo: "Criado", nomeUsu: "gabreu", idAcao: 1 },
        { data: '13/12/12', tipo: "Aprovado risco", nomeUsu: "bruna", idAcao: 2 },
        { data: '13/12/12', tipo: "Aprovado impacto", nomeUsu: "bruna", idAcao: 3 },
        { data: '14/12/12', tipo: "Aprovado custo", nomeUsu: "marcelo", idAcao: 4 },
        { data: '14/12/12', tipo: "Arquivado", nomeUsu: "emenerton", idAcao: 5 },
        { data: '14/12/12', tipo: "Atualizado", nomeUsu: "emenerton", idAcao: 6 },

    ];

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
            default:
                // Caso tenha algum id que nao bate
                return "bg-gray-500";
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="w-760 m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Header category="Pagina" title="Historico" />
                <ol class="relative border-l border-gray-400">
                    {tiquete.map((tiq) => (
                        <li class="mb-10 ml-4">
                            <div
                                class={`${cor(tiq.idAcao)} absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-600`}
                            ></div>
                            <time class="mb-1 text-sm font-semibold leading-none text-gray-500">{tiq.data} </time>
                            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-900">{tiq.tipo}</h3>
                            <p class="mb-4 text-base font-semibold text-gray-600">Realizado por {tiq.nomeUsu}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </div>

        
    );
};

export default Historic;
