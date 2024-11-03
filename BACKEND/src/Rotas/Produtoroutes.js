import { Router } from "express";
import ProdutoCtrl from "../Controle/ProdutosCtrl.js";

const rotaProduto = new Router();
const produtoCTRL = new ProdutoCtrl();
//definição de endpoints que serão processadas pela camada de controle
//para um determinado cliente

rotaProduto.post('/', produtoCTRL.gravar)
.get('/', produtoCTRL.consultar)


export default rotaProduto;