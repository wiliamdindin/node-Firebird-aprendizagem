import { Router } from "express";
import { executeQuery } from "../../config/database.js";


const controllerComandas = Router();

//Busca as mesa; comandas 
controllerComandas.get("/comandas/:idEmpresa", function(request, res) {

    let filtro = [request.params.idEmpresa];
   
    let ssql = "select * from FNC_BUSCA_MAPA_COMANDAS(?,0,0) ";
    
   executeQuery(ssql, [filtro], function(err, result){
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});

//Busca os itens consumido da mesa/comanda
controllerComandas.get("/comandas/:idEmpresa/:idConsumo", function(request, res) {

    /*let filtro = [];
    let ssql = " select id_produto , id_consumo"+
                "     ,(select p.descricao from produto p where p.id_grupo = ? and p.id = i.id_produto) "+
                "       ,i.qtde "+
                "       ,i.valor_total "+
                " from fnc_comanda_consumo_itens i "+
                " where id_consumo = ?";*/
    let ssql = "select id_produto "+
               "         ,descricao "+
               "        ,qtde "+
               "        ,valor_total "+
               "        ,id_consumo "+
               "    from busca_itens_comanda(?,?)"

    //console.log(ssql);
   executeQuery(ssql, [request.params.idEmpresa, request.params.idConsumo] , function(err, result){
    //executeQuery(ssql, [request.params.id], function(err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});  

//busca o ID da comando que esta aberta em consumo
controllerComandas.get("/buscaIdComandas/:idEmpresa/:codigo", function(request, res) {

    let filtro = [];
   
    let ssql = "execute block( id_empresa integer = ?, "+
               "        codigo integer = ?) "+
               
               "     returns (id_consumo integer) "+
               "     as "+
               "     declare variable var_comanda integer; "+
               "     begin "+
               "       id_consumo = 0; "+

               "       select id "+
               "       from fnc_comanda "+
               "       where id_empresa = :id_empresa and "+
               "       codigo = :codigo "+
               "       into: var_comanda;  "+                           
                            
               "       select id from fnc_comanda_consumo "+
               "       where  id_comanda = :var_comanda and "+
               "       em_uso = 1 "+
               "       into:id_consumo;"+
               "       suspend; "+
               "     end ";

   executeQuery(ssql, [request.params.idEmpresa, request.params.codigo], function(err, result){
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});


//Gravar o produto consumido na mesa
controllerComandas.post("/comandasConsumo", function(request, response){

    let ssql = "insert into fnc_comanda_consumo_itens (ID_CONSUMO, ID_GRUPO_PRODUTO, ID_PRODUTO, QTDE ,VALOR_UNITARIO, VALOR_TOTAL, APLICATIVO) "+
               "values(?,?,?,?,?,?,?) RETURNING id";
    
    executeQuery(ssql, [request.body.ID_CONSUMO,
                       request.body.ID_GRUPO_PRODUTO,
                       request.body.ID_PRODUTO,
                     //  request.body.ID_EMBALAGEM,
                       request.body.QTDE,
                       request.body.VALOR_UNITARIO,
                       request.body.VALOR_TOTAL,
                       request.body.APLICATIVO], function(err, result){
        if (err) {
            response.status(500).json(err);
            //console.log('ERROR');
        } else {
            response.status(201).json({ id: result.ID});
            
        }
    });    
});


//Encerrar Comandas
controllerComandas.post("/comandas/abrirEncerrar/:idEmpresa/:tipo/:comanda", function(request, response){    
    
    const ssql = "execute procedure FNC_BUSCA_MAPA_COMANDAS(?,?,?) ";      
//console.log(ssql);
    executeQuery(ssql, [request.params.idEmpresa,
                        request.params.tipo,
                        request.params.comanda], function(err, result) {
        if (err) {
            return response.status(500).send(err);
        } else {           
            return response.status(200).json(result);
        }
    });
});

export default controllerComandas;