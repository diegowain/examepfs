
import express from 'express';
import cors from 'cors';
import rotaProduto from '../BACKEND/src/Rotas/ProdutoRoutes.js';
import rotaPedido from '../BACKEND/src/Rotas/PedidoRoutes.js';
import rotaCliente from '../BACKEND/src/Rotas/ClienteRoutes.js';



const host='0.0.0.0';
const porta=4000;

const app = express();

app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/produto',rotaProduto);
app.use('/cliente',rotaCliente);
app.use('/pedido',rotaPedido);


app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})