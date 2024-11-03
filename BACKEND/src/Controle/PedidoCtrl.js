import Pedido from '../Modelo/Pedido.js';
import PedidoDAO from '../DAO/PedidoDAO.js';


export default class PedidoCtrl {
 

    async inserirPedido(req, res) {
        res.type("application/json");

        if (req.method === "POST" && req.is('application/json')) {
            const { cliente_id,total, itens } = req.body;

            if (!cliente_id || !total || !itens || itens.length === 0) {
                return res.status(400).json({
                    status: false,
                    mensagem: "Cliente e itens do pedido são obrigatórios."
                });
            }

            const pedido = new Pedido(cliente_id, total,itens);

            try {
                const pedidoId = await PedidoDAO.inserirPedido(pedido);
                res.status(200).json({
                    status: true,
                    
                    cliente_id,
                    total,
                    itens,
                    mensagem: "Pedido criado com sucesso!"
                });
            } catch (error) {
                res.status(500).json({
                    status: false,
                    mensagem: error.message || "Erro ao criar pedido."
                });
            }
        } else {
            res.status(400).json({
                status: false,
                mensagem: "Método não permitido ou pedido no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    async consultar(requisicao, resposta) {
        resposta.type("application/json");
    
        if (requisicao.method === "GET") {
            try {
                const pedido = new Pedido();
                const pedidos = await pedido.consultar('');
    
                resposta.status(200).json({
                    status: true,
                    listaPedidos: pedidos
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
    

    async removerPedido(req, res) {
        res.type("application/json");

        if (req.method === "DELETE") {
            const { codigo } = req.params;

            try {
                await PedidoDAO.excluirPedido(codigo);
                res.status(200).json({
                    status: true,
                    mensagem: "Pedido excluído com sucesso."
                });
            } catch (error) {
                res.status(500).json({
                    status: false,
                    mensagem: error.message || "Erro ao excluir pedido."
                });
            }
        } else {
            res.status(400).json({
                status: false,
                mensagem: "Método não permitido! Consulte a documentação da API"
            });
        }
    }
}
