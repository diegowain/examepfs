import PedidoDAO from "../DAO/PedidoDAO.js";

export default class Pedido {

    #cliente_id;
    #total;
    #itens;

    constructor( cliente_id,  total, itens = []) {
        
        this.#cliente_id = cliente_id;
    
        this.#total = total;
        this.#itens = itens;
    }

    get cliente_id() {
        return this.#cliente_id;
    }

    set cliente_id(novoClienteId) {
        this.#cliente_id = novoClienteId;
    }

 

    get total() {
        return this.#total;
    }

    set total(novototal) {
        this.#total = novototal;
    }

    get itens() {
        return this.#itens;
    }

    set itens(novosItens) {
        this.#itens = novosItens;
    }

    toString() {
        return `Cliente ID: ${this.#cliente_id}, Total: ${this.#total}, Itens: ${JSON.stringify(this.#itens)}`;
    }

    toJSON() {
        return {
            
            'cliente_id': this.#cliente_id,
            
            'total': this.#total,
            'itens': this.#itens
        };
    }

    async gravar() {
        const pedidoDAO = new PedidoDAO();
        await pedidoDAO.inserirPedido(this);
    }

    async consultar() {
        const pedidoDAO = new PedidoDAO();
        const pedidoData = await pedidoDAO.consultar();
        return pedidoData;



    }

    async excluir() {
        const pedidoDAO = new PedidoDAO();
        await pedidoDAO.removerPedido();
    }
}
