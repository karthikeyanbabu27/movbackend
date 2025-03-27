const writer=require('../util/write-tofile')
module.exports=(req,res)=>{
    let baseurl=req.url.substring(0,req.url.lastIndexOf('/')+1)
    const  regexv4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    let id=req.url.split('/')[3];
    console.log(id)
    console.log(baseurl)

    if(!regexv4.test(id)){
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "incorect uuid" }))
    }
    else if(baseurl='/api/movies/' && regexv4.test(id)){
        var index= req.movies.findIndex(movies=>movies.id===id)
    
        if(index ===-1){
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "movie not found" }));
        
       
        }else{ 
            req.movies.splice(index,1)
            writer(req.movies)
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(req.movies));
            
          }
    }else{
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Endpoint not found" }));
    }

};