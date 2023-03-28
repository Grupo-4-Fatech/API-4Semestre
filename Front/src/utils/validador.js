export const validador = {
    estaVazio(texto) {
        const textoVazio = texto === null || texto.replace(/<p>((<br>)|(&nbsp;)|\s)+<\/p>/gm, "") === ""
        return textoVazio
    },
    selectEstaDefault(elementoSelect) {
        return elementoSelect.value === "default"
    }
}

