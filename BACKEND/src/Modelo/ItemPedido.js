export default class ItemPedido {

    
    #produtoId
    #quantidade
    constructor(  produtoId, quantidade) {
                     // ID do item do pedido
         // ID do pedido ao qual este item pertence
        this.#produtoId = produtoId;   // ID do produto associado
        this.#quantidade = quantidade;  // Quantidade do produto no pedido
    }


    
    get produtoId() {
        return this.#produtoId;
    }

    set produtoId(novoProdutoId) {
        this.#produtoId = novoProdutoId;
    }
    get quantidade() {
        return this.#quantidade;
    }
    set quantidade(novaQuantidade) {
        if (novaQuantidade > 0) {
        this.#quantidade = novaQuantidade;
    }
    }

    toJSON() {
        return {
            
            'produtoId': this.#produtoId,
            'quantidade': this.#quantidade
        }
    }
}


