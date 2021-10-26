
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { API_VERSION } = require('./config');

//load routings
const authroutes= require('./routers/auth');
const UserRoutes= require('./routers/user');
const MascotaRoutes= require('./routers/mascotas');
const FNormal= require('./routers/FNormal');
const FLabo= require('./routers/FLabo');
const RegReserv= require('./routers/reserva');
const RegSolRadio= require('./routers/SolRadio');
const RegSolLabo= require('./routers/SolLabo');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure Header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });


// Router Basic
app.use(`/api/${API_VERSION}`,authroutes);
app.use(`/api/${API_VERSION}`, UserRoutes);
app.use(`/api/${API_VERSION}`, MascotaRoutes);
app.use(`/api/${API_VERSION}`, FNormal);
app.use(`/api/${API_VERSION}`, FLabo);
app.use(`/api/${API_VERSION}`, RegReserv);
app.use(`/api/${API_VERSION}`, RegSolRadio);
app.use(`/api/${API_VERSION}`, RegSolLabo);



module.exports = app;