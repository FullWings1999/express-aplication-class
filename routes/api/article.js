const express = require("express");
const router = express.Router();
const fs = require("fs"); 
const path = require("path");

//讀articales.json
const articalFilePath = path.join(__dirname,"../../data/articales/articales.json");

//文章列表
router.get("/",(req,res)=>{
    fs.readFile(articalFilePath,(err, data)=>{
        if(err) console.log(err);

        const articles = JSON.parse(data.toString());

        //回傳json訊息
        return res.send({
            statusText:"ok",
            articles:articles
        });
    });
});

//單篇文章
router.get("/:id",(req,res)=>{
    const id = req.params.id;
    fs.readFile(articalFilePath,(err, data)=>{
        if(err) console.log(err);

        const articales = JSON.parse(data.toString());

        //回傳json訊息
        return res.send({
            statusText:"ok",
            articles:[articales[id]]
        });
    });
});

//新增文章
router.post("/",(req,res)=>{
    const {title,subTitle,content} =req.body;

    //檢查必備資訊title
    if(!title)
        return res.send({
            statusText:"fail",
            message:"fail to post article. title is required"
        });
   
        fs.readFile(articalFilePath,(err, data)=>{
            if(err) console.log(err);
            const articales = JSON.parse(data.toString());
    
            articales.push({
                id : articales.length,
                title : title || "",
                subTitle : subTitle ||"",
                creatDate : new Date().toString(),
                content : content ||"",
                url : `/articales/${articales.length}`,
                publish : true
            });

            const newData = JSON.stringify(articales,null,4);

            fs.writeFile(articalFilePath, newData, (err)=>{
                if(err) console.log(err);

                //回傳json訊息
                res.send({
                    statusText : "ok",
                    message : "success post article"
                });
            });

        });

});

//修改文章
router.put("/:id",(req, res)=>{
    const id = req.params.id;
    const {title, subTitle, content} = req.body;

    fs.readFile(articalFilePath ,(err,data)=>{
        if(err) console.log(err);

        const articales = JSON.parse(data.toString());

        articales[id] = {
            ...articales.id,
            title:title||"",
            subTitle:subTitle||"",
            updatedDate:new Date().toString(),
            content:content||""
        };

        const newData = JSON.stringify(articales, null, 4);

        fs.writeFile(articalFilePath, newData, (err)=>{
            if(err) console.log(err);

            res.send({
                statusText:"ok",
                message:"success put article"
            });
        });
    });
});

//刪除文章
router.delete("/:id", (req,res)=>{
    const index = req.params.id;

    return fs.readFile(articalFilePath,(err,data)=>{
        if (err) console.log(err);

        const articales = JSON.parse(data.toString());
        if(parseInt(index) > -1 && parseInt(index) < articalFilePath.length){
            //軟性刪除，不會刪除資料，只是增加跟修改設定key
            articales[index] = {
                ...articales[index],
                publish : false,
                delete : true,
                deleteDate : new Date().toString()
            };

            const newData = JSON.stringify(articales, null, 4);

            return fs.writeFile(articalFilePath, newData, (err)=>{
                if (err) console.log(err);

                //回傳JSON訊息
                return res.send({
                    statusText : "ok",
                    message : "success delete article"
                });
            });
        }

        return res.send({
            statusText : "fail",
            message : "failed to delete article"
        });
    });
});

module.exports = router ;