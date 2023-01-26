import { request, Router } from "express";
import { executeQuery } from "../../config/database.js";

const controllerRelatorioVendasGraficos = Router();

controllerRelatorioVendasGraficos.get("/relatorio", function(request, res) {

        let filtro = [];        
      
        const ssql = "select extract(month from m.data) mes "+
                  "     , extract(year from m.data) ano "+
                  "      , extract(month from m.data) ||'/'|| "+
                  "       extract(year from m.data) mes_ano "+
                  "     , (select coalesce(sum(v.valor_final),0) "+
                  "       from FNC_REL_VENDAS (1 "+
                    "                   ,1 "+
                    "                  ,(select data from firstday(m.data)) "+
                    "                  ,(select data from lastday(m.data)) "+
                    "                  ,:par_produtos "+
                    "                  ,:par_servicos "+
                    "                  ,:par_filtro_cliente "+
                    "                  ,:par_filtro_grupo "+
                    "                  ,:par_filtro_vendedor "+
                    "                  ,:par_filtro_produto "+
                    "                  , 1 "+
                    "                  , null "+
                    "                  , null "+
                    "                  ,:par_tipo_emp_cli "+
                    "                  ,:par_filtro_codigo "+
                    "                  ,:par_filtro_opcao_codigo "+
                    "                  ,:par_filtro_apelido "+
                    "                  ,:par_filtro_opcao_apelido "+
                    "                  ,:par_custo_contabilidade,0,:par_filtro_especie) v  "+
                    "      WHERE ((COALESCE(TRIM(CAST(:PAR_SERIE AS VARCHAR(5))),'') = '') or (TRIM(UPPER(V.SERIE)) = COALESCE(TRIM(CAST(:PAR_SERIE AS VARCHAR(5))),''))) "+
                    "      ) total_mes "+
                    "  from incmonth_list('2022-01-01','2022-12-12') m ";



//const ssql = "select * from fnc_comanda";
     // console.log(ssql);
      executeQuery(ssql, [filtro], function(err, result){
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(result);
            }
        });
});

export default controllerRelatorioVendasGraficos;


