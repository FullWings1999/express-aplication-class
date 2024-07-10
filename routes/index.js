const express = require("express");
const router = express.Router(); 
//const articales = require("../data/articales");
const path = require("path");

const validateUser = (user) =>{
    return true;
};

//驗證使用者身份
const authentucator = (req, res, next) =>{
    if(validateUser(req.user)){
        next();
    }else{
        res.redirect("/");
    }
};

//路由都放到這個檔案且把app->router
router.get("/",function(req,res){
    res.render("home");
    //res.send("hello world");
});

router.get("/about",(req,res)=>{
    //throw new Error("something wrong");
    res.render("about");
});

//使用routes將articles拉出來 
router.use("/articales",authentucator,require("./articales"));

//使用routes將login拉出來 
router.use("/auth",require("./auth"));

//使用routes將靜態檔案顯示拉出去
router.use("/file",require("./file"));

//載入api
router.use("/api",require("./api"));

/* error page */
router.get("/*",function(req,res){
    res.send("page not found");
});

module.exports = router;