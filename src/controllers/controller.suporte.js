import { Router } from "express";
import { executeQuery } from "../config/database.js";

const controllerSuportes = Router();

controllerSuportes.get("/todosSuportes", function(req, res){

    let filtro = [];    
    let ssql = "select ID_REVENDA, "+
               "    ID_CLIENTE, "+
               "    (selecT C.nome from TBL_CLIENTES C WHERE C.id_prosis = D.id_revenda AND C.ID = D.id_cliente) as cliente, "+
               "    FUNCIONARIO, "+
               "    INICIO_SUPORTE, "+
               "    FIM_SUPORTE "+
               " FROM TBL_SUPORTE_CLIENTE D "+
               " WHERE CAST(D.inicio_suporte AS DATE) = CURRENT_DATE";

    executeQuery(ssql, filtro, function(err, result){
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });    
});

export default controllerSuportes;