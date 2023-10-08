// const fs = require("fs");

// fs.readFile(`${__dirname}/dev-data/name.txt`,"utf-8",(err,name)=>{
//     if(err){
//         console.log(err)
//     }
//     fs.readFile(`${__dirname}/dev-data/${name}.txt`,"utf-8",(err,data1)=>{
//         if(err)console.log(err)
//         fs.readFile(`${__dirname}/dev-data/sec.txt`,"utf-8",(err,data2)=>{
//             if(err)console.log(err)
//             fs.writeFile(`${__dirname}/dev-data/new-data.txt`,`${data1}\n${data2}`,(err)=>{
//                 if(err)console.log(err)
//                 console.log(`finist node file read and write with Asynchronous`)
//             })
//         })
//     })
// })

// Core Modules
const http = require("http");
const fs = require("fs");
const url = require("url");

// Own Modules
const replaceTemplate = require("./ownModules/replaceTemplate")

// json data
const apiData = fs.readFileSync(`${__dirname}/dev-data/products.json`,"utf-8")
const objData = JSON.parse(apiData)

// read template
const templateHome = fs.readFileSync(
    `${__dirname}/template/index.html`,
    "utf-8"
  );
const templateCard= fs.readFileSync(`${__dirname}/template/card.html`,"utf-8");
const singleTemplateCard = fs.readFileSync(`${__dirname}/template/singleProduct.html`,"utf-8")

const sever = http.createServer((request,response)=>{
    // const pathName = request.url;
    const {query,pathname} = url.parse(request.url,true)

    if(pathname === "/" || pathname === "/home"){
        response.writeHead(200, {
            "Content-type": "text/html",
          });

        const cardHml = objData.map((el)=> replaceTemplate(templateCard,el)).join("")
        const finalOutput = templateHome.replace(/{%CARDS%}/g,cardHml)
        response.end(finalOutput)
    }
    else if(pathname === "/api"){
        response.writeHead(200,{"Content-type" : "application/json"})
        response.end(objData)
    }
    else if(pathname === "/product"){
        console.log(query);
        const singleProduct = objData[query.id -1];
        console.log(singleProduct);
        const outPut = replaceTemplate(singleTemplateCard,singleProduct)
        response.end(outPut)
    }else{
        response.writeHead(404,{"Content-type": "text/html"});
        response.end("<h1>Page not found</h1>")
    }
})

sever.listen(4000,"127.0.0.1",()=>{
    console.log(`Your sever is running now ...`)
})