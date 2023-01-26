import { application, Router } from "express";
import { executeQuery } from "../config/database.js";

/*const connection = require('../database/connection.js');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs').where('id', id)
                                            .select('name')
                                            .first();

        // id not registered
        if (!ong) {
            return response.status(401).json({ error: 'No ONG Found with this ID' });
        }

        // id registered
        return response.json(ong);
    },
}; */


const controllerUsuarios = Router();

//Consultar Todos os Usuarios 
controllerUsuarios.get("/usuarios", function(request, res) {

    let filtro = [];
    let ssql = "select id, login, senha from usuarios";

    executeQuery(ssql, filtro, function(err, result){
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});

controllerUsuarios.post("/usuarios/login", function(request, response){         
   
   

    let ssql = "select id, nome_completo ";        
    ssql += "from usuarios where login=? and senha=?";
    
    executeQuery(ssql, [request.body.login, request.body.senha], function(err, result) {
        if (err) {
            return response.status(500).send(err);
        } else {            
            return response.status(result.length > 0 ? 200 : 401).json(result);
        }
    });
});

controllerUsuarios.get("/usuarios/:id", function(request, response){        
    let ssql = "select id, nome_completo "
    //ssql += "date_format(dt_cadastro, '%d/%m/%Y %H:%i:%s') as dt_cadastro ";
    ssql += "from usuarios where id = ? ";

    executeQuery(ssql, [request.params.id], function(err, result) {
        if (err) {
            return response.status(500).send(err);
        } else {            
            return response.status(result.length > 0 ? 200 : 401).json(result[0]);
        }
    });
});


controllerUsuarios.post("/usuarios/cadastrar", function(request, response){

    let filtro = [request.body.nome, request.body.login, request.body.senha]

    let ssql = "INSERT INTO usuarios(nome, login, senha) VALUES(?,?,?) RETURNING id";

    executeQuery(ssql, [filtro], function(err, result){
        if (err) {
            response.status(500).json(err);            
        } else {            
            response.status(201).json({ id: result.ID});
            
        }
    });    
});


export default controllerUsuarios;


//GET    = "/usuarios"           Consulta  cadastro   
//POST   = "/usuarios/cadastro"  Inclui novo cadastro   
//PUT    = "usuarios/:id"        Altera o cadastro
//DELETE = "/usuarios/:id"       Deleta o cadastro