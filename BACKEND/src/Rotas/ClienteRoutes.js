import { Router } from "express";
import ClienteCtrl from "../Controle/ClienteCtrl.js";

const rotaCliente = new Router();
const clienteCTRL = new ClienteCtrl();
//definição de endpoints que serão processadas pela camada de controle
//para um determinado cliente

rotaCliente.post('/', clienteCTRL.gravar)
.get('/', clienteCTRL.consultar)


export default rotaCliente;