import { Router } from "express";
import { executeQuery } from "../config/database.js";


const controllerEmpresas = Router();


controllerEmpresas.get("/empresas", function(request, res) {

    let filtro = [];
   
    let ssql = "select id "+ 
               "      ,trim(e.cnpj) as cnpj  "+
               "      ,trim(e.cpf) as cpf "+ 
               "      ,trim(e.razao_social) as razao_social "+  
               "      ,(select first 1 c.campo_numerico from empresa_campos c where id_empresa = e.id and id_campo = 31)" +
               "from empresa e "+
               "where usa_todos = 1 ";

   executeQuery(ssql, [filtro], function(err, result){
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});



export default controllerEmpresas;

