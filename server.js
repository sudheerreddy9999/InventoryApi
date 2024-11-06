'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet';
import Router from './routes/index.route.js';
import appConfig from './config/app/app.config.js';
import pgsql from './config/database/database.config.js'

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(express.urlencoded({extended:false}));

app.use(Router);

const authenticateDb =()=>{
    try {
        pgsql.authenticate();
        console.log("Db Connected successfully")
    } catch (error) {
        console.error(error.message);
    }
}
const startServer = ()=>{
    try {
        app.listen(appConfig.PORT,()=>{
            console.log(`App listening on port ${appConfig.PORT}`);
        }) 
    } catch (error) {
        console.error(error.message);
    }
}
startServer();
authenticateDb();