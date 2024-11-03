import conectar from "../DAO/Conexao.js";
import Pedido from "../Modelo/Pedido.js";

export default class PedidoDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();

            const sqlPedidos = `
                CREATE TABLE IF NOT EXISTS pedido (
                    codigo INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                    cliente_id INT NOT NULL,
                    data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
                    total DECIMAL(10,2) '
                )`;

            const sqlItensPedido = `
                CREATE TABLE IF NOT EXISTS itens_pedido (
                    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                    pedidoId INT NOT NULL,
                    produtoId INT NOT NULL,
                    quantidade INT NOT NULL,
                    FOREIGN KEY (pedidoId) REFERENCES pedido(cliente_id) ON DELETE CASCADE,
                    FOREIGN KEY (produtoId) REFERENCES produto(id)
                )`;

            await conexao.execute(sqlPedidos);
            await conexao.execute(sqlItensPedido);
            await global.poolConexoes.releaseConnection(conexao);

            console.log("O Banco de Dados foi iniciado")
        }catch(erro){
            console.log("O Banco de Dados não foi iniciado")
        }
    }

    // Método para inserir um novo pedido e seus itens
    static async inserirPedido(pedido) {
        if (!(pedido instanceof Pedido)) throw new Error("Objeto de pedido inválido");

        const conexao = await conectar();

        try {
            await conexao.beginTransaction();
            const sqlPedido = `INSERT INTO pedido (cliente_id, total) VALUES (?, ?)`;
            const parametros =[
                pedido.cliente_id,
                pedido.total
               
            ]

            const retorno = await conexao.execute(sqlPedido,parametros);
            pedido.codigo = retorno[0].insertId;
            

            const sql2 = `INSERT INTO itens_pedido ( produtoId, quantidade) VALUES ( ?, ?)`;
            for (const item of pedido.itens) {
                const sqlParametros = [
                    
                    item.produtoId,
                    item.quantidade
                ];
                await conexao.execute(sql2, sqlParametros);
            }
            
            await conexao.commit();
            await global.poolConexoes.releaseConnection(conexao);
           
        } catch (erro) {
            await conexao.rollback();
            await global.poolConexoes.releaseConnection(conexao);
            throw new Error("Erro ao inserir pedido: " + erro.message);
        }
    }

    // Método para buscar um pedido pelo ID
    async consultar(termoBusca) {
        let sql = "";
        let parametros = [];
        
        if (termoBusca) {
            sql = `SELECT * FROM pedido WHERE codigo = ? ORDER BY cliente_id`;
            parametros.push(termoBusca);
        } else {
            sql = `SELECT * FROM pedido ORDER BY codigo`;
        }
        
        const conexao = await conectar();
    
        try {
            const [registros] = await conexao.execute(sql, parametros);
            let listaPedidos = [];
    
            for (const registro of registros) {
                const pedido = new Pedido(
                    registro.cliente_id,
                    registro.total
                );
                listaPedidos.push(pedido);
            }
            
            return listaPedidos;
    
        } catch (erro) {
            console.error("Erro ao consultar clientes:", erro.message);
            throw new Error("Erro ao consultar clientes: " + erro.message);
        } finally {
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    // Método para remover um pedido e seus itens relacionados
     async removerPedido(codigo) {
        const conexao = await conectar();
    
        try {
            await conexao.beginTransaction();
    
            const sqlRemoverItens = `DELETE FROM itens_pedido WHERE pedidoId = ?`;
            await conexao.execute(sqlRemoverItens, [codigo]);
    
            const sqlRemoverPedido = `DELETE FROM pedido WHERE codigo = ?`;
            await conexao.execute(sqlRemoverPedido, [codigo]);
    
            await conexao.commit();
            await global.poolConexoes.releaseConnection(conexao);
        } catch (error) {
            await conexao.rollback();
            await global.poolConexoes.releaseConnection(conexao);
            throw new Error("Erro ao remover pedido: " + error.message);
        }
    }
    
}
