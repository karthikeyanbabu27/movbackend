const bodyparser=require('../util/bodyparserh')
const writer=require('../util/write-tofile')   

//update
   
module.exports=async (req,res)=>{
    baseurl=req.url.substring(0,req.url.lastIndexOf('/')+1)
    const  regexv4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    let id=req.url.split('/')[3];
    console.log(id)
    console.log(baseurl)
    


    if (!regexv4.test(id)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "incorrect uuid" }));
    } else if (baseurl === '/api/movies/' && regexv4.test(id)) {
        try{
        var index = req.movies.findIndex(movie => movie.id === id);
        console.log(index)
        const body = await bodyparser(req);

        if (index === -1) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "movie not found" }));
        } else {
            req.movies[index] = { id, ...body };
            writer(req.movies);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(req.movies[index]));
        }
       }catch(err){
        console.log (err.message)
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "it seems to ther is a some error" }));

       }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "incorret uuid" }));
    }
};
