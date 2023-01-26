import { Router } from "express";
import { executeQuery } from "../config/database.js";


const controllerGrupoProdutos = Router();


controllerGrupoProdutos.get("/grupoprodutos/:idGrupo", function(request, res) {    
   
    let ssql = "select id, " +
               "       descricao, " +
               "       '' as ICONE  "+             
               "from grupo_produtos "+
               "where id_grupo = ? ";
   
   executeQuery(ssql, [request.params.idGrupo], function(err, result){
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});



export default controllerGrupoProdutos;

