const TimeLine = ({ data, titulo, autor, descricao }) => {

    return (

        <ol class="relative border-l border-gray-200 dark:border-gray-700">
            <li class="mb-10 ml-4">
                <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{data} feito por: {autor}</time>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{titulo}</h3>
                <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{descricao}</p>
            </li>
        </ol>

    );
}

export default TimeLine;