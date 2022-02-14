document.getElementById("form1").addEventListener("submit",(e)=>{
	e.preventDefault()
})
const PORT = 443
const ws = new WebSocket("wss://" + window.location.host +":"+ PORT)
const enc = new TextEncoder()
let buff = new Uint8Array(17)

ws.addEventListener("message", (m)=>{
	console.log("message from server: ", m)	
})

document.getElementById("btn").addEventListener("click", ()=>{
	buff.set(crypto.subtle.digest("SHA-256", enc.encode(document.getElementById("pass").value)))
	ws.send()
})