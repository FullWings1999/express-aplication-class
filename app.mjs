//const express = require("express");
//const app = express();
//const path = require("path");
//import { request } from 'http';

import express from 'express';
import { engine } from 'express-handlebars';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import * as fs from 'fs';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//設定 express-handlebars 樣版引擎
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

/* 定義公開資料夾 */
app.use(express.static('public'));

/*  請求路徑是static時，才能用pubic folder*/
app.use("/static",express.static('public'));

//logger要裝在所有路由前面
const logger = (req,res,next)=>{
    /*
    console.log("1.baseUrl",req.baseUrl);
    console.log("2.url",req.url);
    console.log("3.originalUrl",req.originalUrl);
    console.log("hostname",req.hostname);
    */

    const datetime = new Date();
    const timeStamp = datetime.toString()+" "+req.originalUrl+"\n";
    console.log("timestamp",timeStamp);

    /*
    //logger寫法1.先讀取檔案在寫入檔案
    fs.readFile(path.join(__dirname,"./log/log.txt"),
    (err, data)=>{
        if(err) console.log(err);

        const newDate = data?data.toString()+"\n"+timeStamp:timeStamp;
        //寫入log.txt
        fs.writeFile(path.join(__dirname,"./log/log.txt"),
        newDate,(err) =>{
            if(err) console.log(err);
            next();
        });
    
    });
    */
    //logger寫法2.
    fs.writeFile(
        path.join(__dirname,"./log/log.txt"),
        timeStamp,
        {flag:"a+"},
        (err)=>{
            if(err) console.log(err);
            next();
        }
    );
};

app.use(logger);

//設定路由位在routes下的index.js
app.use("/",require("./routes"));

//errhandler
const errorHandler = (err, req, res, next)=>{
    console.log("err",err);
    console.log(err.name,":",err.message);
    if(err){
        res.status(500).send(`<h1>there is an error ${err.message}</h1>`);
    };
};
app.use(errorHandler);


app.listen(3000, ()=>{
    console.log('express app list on port 3000');
});