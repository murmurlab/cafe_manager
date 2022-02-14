import https from "https"
import fs from "fs"
import { WebSocketServer } from "ws"
import { MongoClient } from "mongodb"
import { Buffer } from "buffer"
import { JWT } from "./jwt.js"
import util from "util"
const enc = new util.TextDecoder

const options = {
	key: fs.readFileSync("./key.pem"),
	cert: fs.readFileSync("./cert.pem")
}

const IP = process.env.ip_adres
console.log(IP);
const url = "mongodb://" + IP + ":27017"
console.log(url);
const myObj = {
	a: 80,
	b: "abc"
}
	
/* !async function(){
	const mydb = await MongoClient.connect(url)
	console.log("WWWWWWWWWWWWWW", mydb);
}() */



const _404 = "./client/404.html"
const default_extension = ".html"

const listener = (req, res) => {

	//
	let obj = {}
	console.log(req.url)
	const query = req.url.split("?")[req.url.split("?").length - 1].split("&")
	for (const key of query) {
		obj[key.split("=")[0]] = key.split("=")[1]
	}
	console.log("query", obj)

	let ext = 0
	let filename = 0
	let file = 0

	const seperate = req.url.split("/") // /a/b/c/d.yaml  /  /a 
	console.log(seperate)
	seperate[seperate.length - 1].startsWith("?") ? seperate[seperate.length - 1] = "" :
		seperate[seperate.length - 1] != "" ? file = seperate[seperate.length - 1].split(".") : file = 0 // d.yaml
	console.log("file: ", file)
	if (file != 0) {
		if (file.length != 1) {
			ext = file[file.length - 1]
			filename = file[0].split("?").filter((e, i) => { return i < file[0].split("?").length - 1 }).join("?")
			console.log(filename)
		} else {
			ext = 0
			file[0].split("?").length == 1 ? filename = file[0] : filename = file[0].split("?").filter((e, i) => { return i < file[0].split("?").length - 1 }).join("?")
			console.log(filename)
		}
	}

	console.log(ext, filename, file)

	console.log("./client" + seperate.join("/"))
	fs.readFile("./client" + seperate.join("/") + `${file == 0 ? "default.html" : ""}`, (err, data) => {
		if (err) {
			console.log(err)
			if (err.code == "ENOENT") {
				let t = ""
				if (seperate.filter((e, i) => { return i < seperate.length - 1 }).join("/") == "") {
					t = "/"
				}
				fs.readFile("./client" + t + seperate.filter((e, i) => { return i < seperate.length - 1 }).join("/") + filename + default_extension, (e, d) => {
					if (e) {
						console.log(e)
						fs.readFile(_404, (e, d) => {
							if (e) {
								console.log(e)
							} else {
								res.write(d)
								res.end()
							}
						})
					} else {
						res.write(d)
						res.end()
					}
				})
			} else if (err.code == "EISDIR") {
				fs.readFile(_404, (e, d) => {
					if (e) {
						console.log(e)
					} else {
						res.write(d)
						res.end()
					}
				})
			}
		} else {
			res.write(data)
			res.end()
		}
	})

}

const server = https.createServer(options, listener)

const wss = new WebSocketServer({ server })
let db
const channelListener = (ws, req) => {
	ws.on("message", async (d) =>  {
		if(!d.length==37)return console.log("invalid array length")
		console.log(d.subarray(0))
		console.log("id: ", d.subarray(21).toString(), enc.decode(d.subarray(21)))

		switch (d[0]) {
			case 0:{//mother login
				if(d.subarray(21).every(e=>(e<=122&&e>=97)||(e<=57&&e>=48)||e==0)){
					const id = d.subarray(21).filter(e=>e!=0).toString()
					console.log(id)
					console.log("ascii passed ✅")
					if (await db.collection("c1").findOne({ mothers: {main}})) {
						console.log(1)
						console.log(new Buffer.from(req.toString() + ws.toString()))
						ws.send()
					} else {
						console.log(0)
					}
				}else{
					console.log("ascii attack")
				}
				console.log("verify ", d[0])
				//console bu yorum highlight denemesi için
				
			}break;
			default:{
				console.log("invalid opcode")
			}
		}
	})
}

MongoClient.connect(url).then((mongo) => {
	/* 	console.log(mongo.db("cafe_manager")); */
		db = mongo.db("cafe_manager")
		wss.on("connection", channelListener)
	})


const http_server_opt = {
	PORT: 443,
	ADDR: IP,
	EVENT: () => {
		console.log(`server listening on ${http_server_opt.ADDR}:${http_server_opt.PORT}`)
	}
}



server.listen(http_server_opt.PORT, http_server_opt.ADDR, http_server_opt.EVENT)
