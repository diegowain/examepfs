import conectar from "../DAO/Conexao.js"
import Cliente from "../Modelo/Cliente.js"
export default class ClienteDAO {

    constructor() {
        this.init();
    }


    async init() {
        try{
        const conexao = await conectar();
        const sql =`CREATE TABLE IF NOT EXISTS clientes
        (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        nome VARCHAR(255) NOT NULL,
        telefone VARCHAR(255) NOT NULL);` 
        
        await conexao.execute(sql);
        await global.poolConexoes.releaseConnection(conexao);
        console.log("O Banco de Dados foi iniciado")
        }catch(erro){
            console.log("O Banco de Dados não foi iniciado")
        }
    }

    async gravar(cliente) {
        if(cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `INSERT INTO clientes (nome, telefone)
             VALUES (?, ?)`
            const parametros = [
                cliente.nome,
                cliente.telefone
            ]
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
        }

  
    

        async consultar(termoBusca) {
            let sql = "";
            let parametros = [];
            
            if (termoBusca) {
                sql = `SELECT * FROM clientes WHERE nome = ? ORDER BY telefone`;
                parametros.push(termoBusca);
            } else {
                sql = `SELECT * FROM clientes ORDER BY nome`;
            }
            
            const conexao = await conectar();
        
            try {
                const [registros] = await conexao.execute(sql, parametros);
                let listaClientes = [];
        
                for (const registro of registros) {
                    const cliente = new Cliente(
                        registro.nome,
                        registro.telefone
                    );
                    listaClientes.push(cliente);
                }
                
                return listaClientes;
        
            } catch (erro) {
                console.error("Erro ao consultar clientes:", erro.message);
                throw new Error("Erro ao consultar clientes: " + erro.message);
            } finally {
                await global.poolConexoes.releaseConnection(conexao);
            }
        }
        
}