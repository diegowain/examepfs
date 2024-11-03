import conectar from "../DAO/Conexao.js"
import ProdutoDAO from "../DAO/ProdutoDAO.js"

export default class Produto {

    #nome
    #preco
    constructor( nome, preco) {
        
        this.#nome = nome
        this.#preco = preco
    }

    get nome() {
        return this.#nome
    }
    set nome(novoNome) {
        this.#nome = novoNome
    }
    get preco() {
        return this.#preco
    }
    set preco(novoPreco) {
        this.#preco = novoPreco
    }

   
    toString(){
        return `Nome: ${this.#nome} 
                Preço: ${this.#preco}`
    }

    toJSON(){
        return {
           
            nome: this.#nome,
            preco: this.#preco
        }
    }

    async gravar() {
        const proDAO = new ProdutoDAO()
         await proDAO.gravar(this)
    }

    async consultar() {
        const proDAO = new ProdutoDAO()
         await proDAO.consultar()
    }
}