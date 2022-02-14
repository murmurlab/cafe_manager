const PORT = 443
let ws
const enc = new TextEncoder()
let buff = new Uint8Array(37)//1 opcode 20 hash 16 id

const statuss = () => {
	if(ws.readyState == 1) {
		document.getElementById("i").style.backgroundColor = "green"
		document.getElementById("i").innerHTML = "Connected"
		console.log("connected")		
	}else if(ws.readyState == 2) {
		document.getElementById("i").style.backgroundColor = "orange"
		document.getElementById("i").innerHTML = "Closing"
		console.log("closing")
		setTimeout(statuss, 100)
	}else if(ws.readyState == 0) {
		document.getElementById("i").style.backgroundColor = "yellow"
		document.getElementById("i").innerHTML = "Connecting"
		console.log("connecting")
		setTimeout(statuss, 100)
	}
}

const connect = () => {
	ws = new WebSocket("wss://" + window.location.host +":"+ PORT)
	Object.keys(events).forEach((e) 	=> {
		ws.addEventListener(e, events[e])
	})
	statuss()
}

const events = {
	"close": (e) => {
		document.getElementById("i").style.backgroundColor = "red"
		document.getElementById("i").innerHTML = "Disconnected"
		console.log("disconnected reason: ", e.code)
		setTimeout(connect, 100)
	},
	"message": (e) => {
		console.log("message from server: ", e)
	}
}

connect()

document.getElementById("form").addEventListener("submit",async(e)=>{
	e.preventDefault()
	buff.set(new Uint8Array(await crypto.subtle.digest("SHA-1", enc.encode(document.getElementById("pass").value))),1)
	buff.set(new TextEncoder().encode(document.getElementById("nick").value), 21)
	//first send id, if id is exist: server on res hashpass send. but id mining available so this method wrong
	//if user want known id. Should add forgot id option
	ws.send(buff)
	
})
