//const express = require("express");
//const app = express();
//const path = require("path");

import express from 'express';
import { engine } from 'express-handlebars';
const app = express();

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const path = require("path");

const articales = require("./data/articales");

//設定樣版引擎

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

/* 修改這裡的端口號 
const port = process.env.PORT || 5000; app.listen(port, () => { console.log(`Express app listening on port ${port}`); });*/

/* 定義公開資料夾 */
app.use(express.static('public'));
/*  請求路徑是static時，才能用pubic folder*/
app.use("/static",express.static('public'));

app.get("/",function(req,res){
    res.render("home");
    //res.send("hello world");
});

//單篇文章
app.get("/articales/:id",(req,res)=>{
    const id = req.params.id;
    res.render("articale",{
        articales:[articales[id]],
        backUrl:"/articales"
    });

    //res.render("artical");
});

//文章列表
app.get("/articales",(req,res)=>{
    res.render("articales",{articales : articales});
});

app.get("/about",(req,res)=>{
    res.render("about");
});

app.get("/txt",(req,res)=>{
    const absfile = path.join(__dirname, "/file/test.txt");
    res.sendFile(absfile,(err)=>{
        console.log(err);
    });
});

app.get("/getHtml",(req,res)=>{
    const absfile = path.join(__dirname, "/file/HTML/test.html");

    res.sendFile(absfile,(err)=>{
        console.log(err);
    });
});

app.get("/getImg",(req,res)=>{
    const absfile = path.join(__dirname, "/file/Img/pexels-pixabay-433155.jpg");

    res.sendFile(absfile,(err)=>{
        console.log(err);
    });
});

/* error page */
app.get("/*",function(req,res){
    res.send("page not found");
});

app.listen(3000, ()=>{
    console.log('express app list on port 3000');
});