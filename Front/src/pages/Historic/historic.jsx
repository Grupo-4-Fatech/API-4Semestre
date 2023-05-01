import { Header } from "../../components";

const Historic = () => {
    const tiquete = [
        { data: '12/12/12', titulo: "asd1", autor: "ele mesmo1", descricao: "asd1" },
        { data: '13/12/12', titulo: "asd2", autor: "ele mesmo2", descricao: "asd2" },
        { data: '14/12/12', titulo: "asd3", autor: "ele mesmo3", descricao: "asd3" },

    ]

    return (

        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Historic" />
            <ol class="relative border-l border-gray-200 dark:border-gray-700">
                {tiquete.map((tiq) =>
                    <li class="mb-10 ml-4">
                        <div class="absolute w-3 h-3 bg-gray-400 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time class="mb-1 text-sm font-semibold leading-none text-gray-659 dark:text-gray-659">{tiq.data} feito por: {tiq.autor}</time>
                        <h3 class="text-lg font-bold text-gray-900 dark:text-gray-900">{tiq.titulo}</h3>
                        <p class="mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">{tiq.descricao}</p>

                    </li>
                )}
            </ol>
        </div>
    );
}

export default Historic;