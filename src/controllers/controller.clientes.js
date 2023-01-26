import { Router } from "express";
import { executeQuery } from "../config/database.js";
//import db from "../config/database.js";

const controllerClientes = Router();

//Consultar Todos os Usuarios 
controllerClientes.get("/todosClientes", function(request, res) {

    let filtro = [];
    let ssql = "select first 50 id , nome, cpf , data_cadastro "+
               "from for_cli "+
              // "where cpf is not null  "+
                "order by id desc";
  console.log(ssql);
   executeQuery(ssql, filtro, function(err, result){
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});

controllerClientes.post("/inativo", function(request, response){    
    
    let filtro = [];
    //let ssql = "insert into for_cli(nome ,nome_fantasia ,endereco ,bairro ,numero ,cidade ,uf, cep) ";
   // ssql += "values(?, ?, ?, ?, ?, ?, ?, ?)";    

   /*let ssql = 'insert into for_cli(nome ,nome_fantasia ,endereco ,bairro ,numero ,cidade ,uf, cep, data_cadastro) '+
               ' values( "nome", "dindin", "d", "d", "d", "d", "d", "d", current_timestamp) ';*/
    let ssql = 'insert into for_cli (nome) '+
    ' values(?) ';

    executeQuery(ssql, [request.body.nome], function(err, result){
        if (err) {
            response.status(500).json(err);
        } else {
            //response.status(201).json({id: result.ID});
        }
    }); 

    /*const schema = Yup.object().shape({
        nome: Yup.string().required().min(4).unique(),

    });

    if (!(await schema.isValid(request.body))) {
        return response.status(401).json({ error: 'Validação Falhou!' });
    }*/

    /*executeQuery(ssql, filtro, function(err, result){
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
     
    executeQuery(ssql, [request.body.nome],/* 
                    request.body.nome_fantasia,
                    request.body.endereco,
                    request.body.bairro,
                    request.body.numero,
                    request.body.cidade,
                    request.body.uf,
                    request.body.cep], function(err, result) {
        if (err) {
            return response.status(500).send(err);
        } else {            
            return response.status(201).json({id: result.id});
        }
    });*/
});


controllerClientes.post("/clientes/cadastro", function(request, response){

    let ssql = "INSERT INTO for_cli(nome) VALUES(?) RETURNING id";
    executeQuery(ssql, [request.body.nome], function(err, result){
        if (err) {
            response.status(500).json(err);
            //console.log('ERROR');
        } else {            
            response.status(201).json({ id: result.ID});
            
        }
    });    
});

controllerClientes.put("/clientes/alteraCadastro/:id", function(request, response){    
    
    let ssql = "update for_cli set nome=? where id = ? ";    

    executeQuery(ssql, [request.body.nome,
                        request.params.id], function(err, result) {
        if (err) {
            return response.status(500).send(err);
        } else {
            return response.status(200).json({id: request.params.id});
        }
    });
});

export default controllerClientes;