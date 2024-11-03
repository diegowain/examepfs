import Produto from '../Modelo/Produtos.js';


export default class ProdutoCtrl{

    gravar(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const nome = dados.nome;
            const preco = dados.preco;
            if( nome && preco)
            {
                //gravar esse cliente
                const produto = new Produto( nome, preco);
                //método assíncrono gravar que instancia a camada de persistência e
                //grava um cliente no banco de dados
                produto.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Produto gravado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });                                   
            }
            else
            {
               resposta.status(400).json({
                    status:false,
                    mensagem:"Informe adequadamente todos os dados de um produto conforme documentação da API!"
               });     
            }
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou pedido no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "GET"){
            const produto = new Produto();
            //método assíncrono que recupera os clientes do banco dados
            produto.consultar('').then((produtos)=>{
                    resposta.status(200).json({
                        status:true,
                        listaProdutos:produtos
                    });
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });                                   
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido! Consulte a documentação da API"
            });
        }
    }



}
