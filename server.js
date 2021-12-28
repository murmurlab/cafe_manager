import http from "http"

const listen = (req,res)=>{
    switch(req.url){
        case "/":{
            console.log(1);
        }
        default:{

        }
        }
            
        
    }
}

http.createServer(listen)