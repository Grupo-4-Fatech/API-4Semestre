export const validador = {
    estaVazio(texto) {
        const textoVazio = texto === null || texto.replace(/<p>((<br>)|(&nbsp;)|\s)+<\/p>/gm, "") === ""
        return textoVazio
    },
    selectEstaDefault(elementoSelect) {
        return elementoSelect.value === "default"
    },
    selectAvaliar(elementoSelect) {
        return elementoSelect.value !== "default"
    },

    selectEstaVazio(elementoSelect) {
        return elementoSelect === null
    },
    tamanhoTexto(texto) {
        if (texto.length <= 50) {
            return false
        } return true
    },
    validarEmail(email) {
        const emailRegex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+?$/i
        return emailRegex.test(email)

    },
    tamanhoSenha(senha) {
        if (senha.length < 9 || senha.length > 15) {
            return false
        } 
        return true
    },
    senhaIgual(senha,senha2){
        if (senha === senha2){
            return false
        } 
        return true
    }
}

