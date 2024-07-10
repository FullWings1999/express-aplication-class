const express = require("express");
const router = express.Router(); 

const fs = require("fs"); 
const path = require("path");

//const articales = require("./articales");

//改讀articales.json
const articalFilePath = path.join(__dirname,"../data/articales/articales.json");

//單篇文章
router.get("/:id",(req,res)=>{
    const id = req.params.id;

    fs.readFile(articalFilePath,(err, data)=>{
        if(err) console.log(err);
        const articales = JSON.parse(data.toString());

        //使用樣板
        res.render("articale",{
            articales:[articales[id]],
            backUrl:"/articales",
            editUrl:`/articales/${id}/edit`,
            deleteMethod:"delete",
            deleteUrl:`/api/articales/${id}`,
            js:["articales.js"]
        });
    });

    /*
    const id = req.params.id;
    res.render("articale",{
        articales:[articales[id]],
        backUrl:"/articales"
    });
    */
    //res.render("artical");
});

//文章列表
router.get("/",(req,res)=>{
    fs.readFile(articalFilePath,(err, data)=>{
        if(err) console.log(err);
        const articales = JSON.parse(data.toString());

        //使用樣板
        res.render("articales",{
            articales:articales
        });
    });


    //res.render("articales",{articales : articales});
});

module.exports = router;