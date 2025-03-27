module.exports = (req, res) => {
    let baseurl=req.url.substring(0,req.url.lastIndexOf('/')+1)
    const  regexv4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    let id=req.url.split('/')[3];
    console.log(id)
    console.log(baseurl)

    if (req.url === '/api/movies') {
        console.log(__dirname)
        // Assuming movies is an array of movie objects
    
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(req.movies));
    }
    else if(!regexv4.test(id)){
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "incorect uuid" }))

    } 
    else if(baseurl='/api/movies/' && regexv4.test(id)){
        var filteredmovie= req.movies.filter(movies=>movies.id===id)
    
        if(filteredmovie.length>0){
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        
        res.end(JSON.stringify(filteredmovie));
        }else{ 
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "movie not found" }));
          }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Endpoint not found" }));
    }
};
