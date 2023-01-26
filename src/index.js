import express from "express";
import cors from "cors";
import controllerEmpresa from "./controllers/controller.empresa.js";
import controllerUsuarios from "./controllers/controller.usuarios.js";
import controllerProdutos from "./controllers/controller.produtos.js";
import controllerClientes from "./controllers/controller.clientes.js";
import controllerPedidos from "./controllers/controller.pedidos.js";
import controllerNotasSaida from "./controllers/controller.notaSaidas.js";
import controllerResumoDiario from "./controllers/controller.resumoDiario.js";
import controllerSuportes from "./controllers/controller.suporte.js";
import controllerSuportesContador from "./controllers/controller.suporteContador.js";
import controllerComandas from "./controllers/comandas/controller.comandas.js";
import controllerGrupoProdutos from "./controllers/controller.grupoprodutos.js";

//relatorios
import controllerRelatorioVendasGraficos from "./controllers/relatorios/controller.vendasGraficos.js";

//import BasicAuth from "./config/basic-auth.js";

const app = express();

//Middleware Json
app.use(express.json());

//Middleware cord
app.use(cors());

//base autent
//app.use(BasicAuth);

app.use(controllerEmpresa);
app.use(controllerUsuarios);
app.use(controllerProdutos);
app.use(controllerClientes);
app.use(controllerPedidos);
app.use(controllerNotasSaida);
app.use(controllerResumoDiario);
app.use(controllerSuportes);
app.use(controllerSuportesContador);
app.use(controllerComandas);
app.use(controllerGrupoProdutos);

// relatorios
app.use(controllerRelatorioVendasGraficos);

app.get("/dindin",function(req,res){
    res.status(200).send("Mensagem teste dindin");         
});

//app.listen(process.env.PORT || 3000,function(){
//    console.log("Servidor no ar");
//}
//);


app.listen(3333,function(){
    console.log("Servidor no ar no PORTA 3333");
}
);

