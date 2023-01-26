import { Router } from "express";
import { executeQuery } from "../config/database.js";

const controllerResumoDiario = Router();

controllerResumoDiario.get("/resumoDiario", function(req, res){

    let filtro = [];    
    let ssql = "select count(id) qtde "+
               "         ,sum(p.valor_total) as valor_total "+
               "         , 'Pedidos' as tipo "+
               "     from fnc_pedido_cliente p "+
               "     where id_empresa = 1 and "+
               "         tipo = 0 and "+
               "         data_pedido = current_date "+

               "     union all "+

               "     select count(id) qtde "+
               "         ,coalesce(sum(p.valor_total),0) as valor_total "+
               "         , 'Orçamentos' as tipo "+
               "     from fnc_pedido_cliente p "+
               "     where id_empresa = 1 and "+
               "         tipo = 1 and "+
               "         data_pedido = current_date "+

               "     union all "+

               "     select count(id) qtde "+
               "         ,coalesce(sum(p.valor_contabil),0) as valor_total "+
               "         , 'Vendas' as tipo "+
               "     from nf_saida p "+
               "     where id_empresa = 1 and "+
               "         data_emissao = current_date";

    executeQuery(ssql, filtro, function(err, result){
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });    
});

export default controllerResumoDiario;