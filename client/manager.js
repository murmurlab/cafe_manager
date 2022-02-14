const PORT = 80
const ws = new WebSocket("ws://" + window.location.host +":"+ PORT)
const enc = new TextEncoder()
let buffer = new Uint8Array(17)

ws.addEventListener("open",(e) => {
	console.log(e)
	ws.send("Hello Server!")
})
ws.addEventListener("message",(e) => {
	console.log("Message from server!", e.data)
})

document.getElementById("btn").addEventListener("click",() => {
	/*
	0 => verify token
	*/
	//buffer[0]=0 already 0
	buffer.set(enc.encode(document.getElementById("token").value),1)
	ws.send(buffer)
	buffer = new Uint8Array(17)
})

document.getElementById("form1").addEventListener("submit",(e)=>{
	e.preventDefault()
})