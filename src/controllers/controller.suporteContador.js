import { Router } from "express";
import { executeQuery } from "../config/database.js";

const controllerSuportesContador = Router();

controllerSuportesContador.get("/suporteContador", function(req, res){

    let filtro = [];    
    let ssql = "select  funcionario as field, quantidade as valor "+
                "from estatistica_suporte(cast(current_date as date), cast(current_date + 1 as date), null) ";
                "order by quantidade desc";

             //   let ssql = "SELECT funcionario "
             //  "        ,Count(*) "
               
            //   "    FROM TBL_SUPORTE_CLIENTE "
            //   "     where cast(inicio_suporte as date ) = current_date "
            //   "     GROUP BY funcionario "
            //   "     HAVING Count(*) > 0 ";

    executeQuery(ssql, filtro, function(err, result){
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });    
});

export default controllerSuportesContador;