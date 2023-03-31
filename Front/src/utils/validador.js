export const validador = {
    estaVazio(texto) {
        const textoVazio = texto === null || texto.replace(/<p>((<br>)|(&nbsp;)|\s)+<\/p>/gm, "") === ""
        return textoVazio
    },
    selectEstaDefault(elementoSelect) {
        return elementoSelect.value === "default"
    },
    tamanhoTexto(texto){
        if (texto.length <= 50){
            return false
        }return true
    }
}

