import conectar from "../DAO/Conexao.js"
import Produto from "../Modelo/Produtos.js"
export default class ProdutoDAO {

    constructor() {
        this.init();
    }


    async init() {
        try{
        const conexao = await conectar();
        const sql =`CREATE TABLE IF NOT EXISTS produto
        (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        nome VARCHAR(255) NOT NULL,
        preco int(255) NOT NULL);` 
        
        await conexao.execute(sql);
        await global.poolConexoes.releaseConnection(conexao);
        console.log("O Banco de Dados foi iniciado")
        }catch(erro){
            console.log("O Banco de Dados não foi iniciado")
        }
    }

    async gravar(produto) {
        if(produto instanceof Produto){
            const conexao = await conectar();
            const sql = `INSERT INTO produto (nome, preco)
             VALUES (?, ?)`
            const parametros = [
                produto.nome,
                produto.preco
            ]
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
        }

  
    

    async consultar(termoBusca) {
        let sql = "";
        let parametros = []
        if(termoBusca){
            sql = `SELECT * FROM produto WHERE nome =  ? order by preco`
            parametros.push(termoBusca);

        }
        else{
            sql = `SELECT * FROM produto order by nome`
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        let listaProdutos = [];
        for (const registro of registros) {
            const produto = new Produto(
                registro.nome,
                registro.preco
            );
            listaProdutos.push(produto);
        }
        await global.poolConexoes.releaseConnection(conexao);
        return listaProdutos
    }

}