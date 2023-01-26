import { request, Router } from "express";
import { executeQuery } from "../config/database.js";

const controllerProdutos = Router();

controllerProdutos.get("/produtos/:idEmpresa/:idGrupo/:pagina/:contador", function(req, res){

    let filtro = [req.params.idEmpresa, req.params.idGrupo];

    let ssql = "select p.id, "+
               "     p.descricao, "+
               "     p.preco_venda "+
               "  ,( select e.estoque_atual from produto_estoque e where e.id_empresa = ? and e.id_grupo = p.id_grupo and e.id_produto = p.id) as estoque "+
               " from produto p "+
               " where p.id_grupo = ? ";

    if (req.query.buscaGrupoProdutos) {
        ssql += "and grupo_produtos = ?";
        filtro.push(req.query.buscaGrupoProdutos);
    };
            
    if (req.query.buscaDescricao) {
        ssql += "and descricao like ? ";
        filtro.push("%"+ req.query.buscaDescricao +"%");        
    };        
        
    ssql += " order by p.id " +
            " rows ? to ?";
 
    filtro.push(req.params.pagina,req.params.contador,);   
 // console.log(ssql+filtro);
    executeQuery(ssql, filtro, function(err, result){
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });    
});

/*Incluindo no cadastro do produto*/
/*
   
   controllerClientes.post("/produtos/cadastro", function(req, res){

    let ssql = "INSERT INTO TAB_PRODUTO(descricao, valor) VALUES(?, ?) RETURNING id_produto ";
    
    executeQuery(ssql, [req.body.descricao, req.body.valor], function(err, result){
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(201).json({id: result.ID_PRODUTO});
        }
    });    
});
*/








controllerProdutos.get("/teste/:idGrupo/idEmpresa", function(req, res){
    //[req.params.idEmpresa, req.params.idGrupo, req.params.pagina, req.params.contador]
    let filtro = [req.params.idGrupo];

    let ssql = "select first 10 id, descricao, preco_venda , 0 as estoque from produto where id_grupo = ? ";

    if (req.query.buscaGrupoProdutos) {
        ssql += "and grupo_produtos = ?";
        filtro.push(req.query.buscaGrupoProdutos);
    };
    
    if (req.query.buscaDescricao) {
        ssql += "and descricao like ? ";
        filtro.push("%" + req.query.buscaDescricao + "%");        
    };    
    //console.log([filtro]);
    executeQuery(ssql, filtro, function(err, result){
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });    
});



export default controllerProdutos;