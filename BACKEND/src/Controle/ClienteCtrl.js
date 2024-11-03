import Cliente from '../Modelo/Cliente.js';

export default class ClienteCtrl{

    gravar(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const nome = dados.nome;
            const telefone = dados.telefone;
           
            if(  nome && telefone )
            {
       
                const cliente = new Cliente( nome, telefone);

                cliente.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Cliente gravado com sucesso!"
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
                    mensagem:"Informe adequadamente todos os dados de um cliente conforme documentação da API!"
               });     
            }
        }
        else{
       
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou cliente no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    

    async consultar(requisicao, resposta) {
        resposta.type("application/json");
    
        if (requisicao.method === "GET") {
            try {
                const cliente = new Cliente();
                const clientes = await cliente.consultar('');
    
                resposta.status(200).json({
                    status: true,
                    listaClientes: clientes
                });
    
            } catch (erro) {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            }
        } else {
            resposta.status(405).json({
                status: false,
                mensagem: "Método não permitido! Consulte a documentação da API"
            });
        }
    }
    
   
}
