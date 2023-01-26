import { Router } from "express";
import { executeQuery } from "../config/database.js";

const controllerNotasSaida = Router();

controllerNotasSaida.get("/nfsaida", function(req, res){

    let filtro = [];    
    let ssql = "select n.id, "+
               "     n.data_emissao, "+
               "    (select nome from for_cli f where f.id = n.id_cliente) "+
               "     ,n.numero , "+
               "     n.especie, "+
               "     n.serie , "+
               "     n.valor_contabil "+
               " from nf_saida n "+
               " where id_empresa = 1 and data_emissao = current_date";

    executeQuery(ssql, filtro, function(err, result){
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });    
});

controllerNotasSaida.get("/nfsaida", function(req, res){

    let filtro = [];    
    let ssql = "select n.id, "+
               "     n.data_emissao, "+
               "    (select nome from for_cli f where f.id = n.id_cliente) "+
               "     ,n.numero , "+
               "     n.especie, "+
               "     n.serie , "+
               "     n.valor_contabil "+
               " from nf_saida n "+
               " where id_empresa = 1 and data_emissao = current_date";

    executeQuery(ssql, filtro, function(err, result){
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });    
});





controllerNotasSaida.get("/nfsaida/:id", function(request, response){    
    
    let ssql = "select n.id, "+
               "     n.data_emissao, "+
               "    (select nome from for_cli f where f.id = n.id_cliente) "+
               "     ,n.numero , "+
               "     n.especie, "+
               "     n.serie , "+
               "     n.valor_contabil "+
               " from nf_saida n "+
               " where id = ?";
          

    executeQuery(ssql, [request.params.id], function(err, result) {
        if (err) {            
            return response.status(500).send(err);
        } else {              
                       
            let jsonNFSaida = result[0];

            let ssql = "select id_produto "+
                       "     ,(select p.descricao from produto p where id_grupo = i.id_grupo_produto and p.id = i.id_produto) "+
                       "     ,i.qtd "+
                       "     ,i.vlr_unitario "+
                       "     ,i.vlr_produto "+
                       "     ,i.id "+
                       " from nf_saida_itens i "+
                       " where id_nf = ? ";

            executeQuery(ssql, [request.params.id], function(err, result){
                if (err) {            
                    return response.status(500).send(err);
                } else {  
                    jsonNFSaida["itens"] = result;

                    return response.status(200).json(jsonNFSaida);                   
                }
            });            
        }
    });
});




export default controllerNotasSaida;