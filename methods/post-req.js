const crypto=require("crypto")
const bodyparser=require('../util/bodyparserh')
const writer=require('../util/write-tofile')
module.exports=async(req,res)=>{
    if (req.url === '/api/movies'){
        try{
            console.log('trying to post')
            const body=await bodyparser(req)//callin body parser
            body.id=crypto.randomUUID()//create a random id
            req.movies.push(body)
            writer(req.movies)
            
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 201;
            res.end();
        }catch(err){
            console.log(err)
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "request is invalid" }));

        }
    } else{
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Endpoint not found" }));
    }

};