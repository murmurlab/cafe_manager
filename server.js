import http from "http"
import fs from "fs"
const listener = (req,res)=>{
	

	switch(req.url){
	case "/":{
		console.log(1)
	}break
	default:{
		fs.readFile("./client/404.html",(e,d)=>{
			if(e){
				console.log("404 page not found")
			}else{
				res.write(d)
				res.end()
			}
		})
	}
	}
}

http.createServer(listener).listen(80,"::1",()=>{console.log("ok");})
