import firebird from "node-firebird";

const dbOptions = {
   // host: '192.168.0.215',
    host: 'localhost',
    port: 26350, 
    database: 'D:\\Arquivos\\Fx Sistemas\\Backup\\Temar\\CONTABIL_NOVO.FDB',
                

  /* ESPACO DECOR*/
  //host: '187.95.11.85',
  // database: 'C:\\Fx Sistemas\\Banco\\Contabil.FDB',  
  //port: 3050, 

  /* Interno Suportes Clientes*/  
 /* host: 'firebird.fxsistemas.dev',
  port: 33050,
  database: '/FXSistemas/Interno/Banco/PROSIS.FDB', 
*/
    user: 'SYSDBA',
    password: 'masterkey',
    lowercase_keys: false, // set to true to lowercase keys
    role: null,            // default
    pageSize: 4096,        // default when creating database    
    retryConnectionInterval: 1000 // reconnect interval in case of connection drop
};

function executeQuery(ssql, params, callback){

    firebird.attach(dbOptions, function(err, db) {
            
        if (err) {
            return callback(err, []); 
        } 

        //console.log(ssql); //Ver o que trouxe no select
       // console.log(ssql + params);
       
       db.query(ssql, params, function(err, result) {
            
            db.detach();

            if (err) {
                return callback(err, []);
            } else {
                return callback(undefined, result);
            }
        });
    });
}

export {executeQuery};


