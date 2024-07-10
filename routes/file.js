const express = require("express");
const router = express.Router(); 
const path = require("path");

router.get("/txt",(req,res)=>{
    const absfile = path.join(__dirname, "/file/test.txt");
    res.sendFile(absfile,(err)=>{
        console.log(err);
    });
});

router.get("/getHtml",(req,res)=>{
    const absfile = path.join(__dirname, "/file/HTML/test.html");

    res.sendFile(absfile,(err)=>{
        console.log(err);
    });
});

router.get("/getImg",(req,res)=>{
    const absfile = path.join(__dirname, "/file/Img/pexels-pixabay-433155.jpg");

    res.sendFile(absfile,(err)=>{
        console.log(err);
    });
});

module.exports = router;