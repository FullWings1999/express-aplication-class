import * as path from 'path';
import * as fs from 'fs';
import * as module from 'module';
import articales from '../data/articales';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//article seed
const articales = require("./article");
//寫入檔案路徑
const articleJsonPath = path.join(__dirname,"../data/articales/articales.json");
//先讀取檔案，在寫入檔案
fs.readFile(articleJsonPath,(err, data)=>{
    if(err) console.log(err);

    const newDate = JSON.stringify(articales, null, 4);

    fs.writeFile(articleJsonPath, newDate, (err)=>{
        if(err) console.log(err);
    });
});