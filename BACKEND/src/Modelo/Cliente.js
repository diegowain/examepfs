import conectar from "../DAO/Conexao.js"
import ClienteDAO from "../DAO/ClienteDAO.js"

export default class Cliente {

    #nome
    #telefone
    constructor(nome, telefone) {
     
        this.#nome = nome
        this.#telefone = telefone
    }

    get nome() {
        return this.#nome
    }
    set nome(novoNome) {
        this.#nome = novoNome
    }
    get telefone() {
        return this.#telefone
    }
    set telefone(novoTelefone) {
        this.#telefone = novoTelefone
    }

   
    toString(){
        return `Nome: ${this.#nome} 
                Telefone: ${this.#telefone}`
    }

    toJSON(){
        return {
           
            nome: this.#nome,
            telefone: this.#telefone
        }
    }

    async gravar() {
        const cliDAO = new ClienteDAO()
         await cliDAO.gravar(this)
    }

    async consultar() {
        const cliDAO = new ClienteDAO()
        const clientes = await cliDAO.consultar();
         return clientes
    }
}