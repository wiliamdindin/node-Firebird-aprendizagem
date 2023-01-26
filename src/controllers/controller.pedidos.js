import { Router } from "express";
import { executeQuery } from "../config/database.js";

const controllerPedidos = Router();

controllerPedidos.get("/pedidos", function(req, res){

    let filtro = [];    
    let ssql = "select data_pedido " +
               "      ,codigo_pedido " +
               "      ,(select nome from for_cli f where f.id = id_cliente) as nome " +
               "      ,status " +
               "      ,case " +
               "         when status = 0 then 'Aberto' " +
               "         when status = 1 then 'Fechado' " +
               "       end as status_descricao "+
               "      ,valor_total "+
               "from fnc_pedido_cliente "+
               "where id_empresa = 1 and "+
               "      tipo = 0 and "+
               "      data_pedido = current_date ";

    executeQuery(ssql, filtro, function(err, result){
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });    
});

export default controllerPedidos;