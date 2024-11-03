import { Router } from "express";
import PedidoCtrl from "../Controle/PedidoCtrl.js";

const rotaPedido = new Router();
const pedidoCTRL = new PedidoCtrl();

// Definição de endpoints que serão processados pela camada de controle para pedidos
rotaPedido.post('/', pedidoCTRL.inserirPedido);                   // Cria um novo pedido
rotaPedido.get('/', pedidoCTRL.consultar );           // Visualiza um pedido pelo ID
rotaPedido.delete('/:codigo', pedidoCTRL.removerPedido);           // Exclui um pedido pelo ID

export default rotaPedido;
