import {Buffer} from "buffer"
import Crypto from "crypto-js"

class JWT {
	static newJwt(head, body, mac){
		return Buffer.from(JSON.stringify(head)).toString("base64").replace(/=/g,"") + //head
		"." +
		Buffer.from(JSON.stringify(body)).toString("base64").replace(/=/g,"") + //body
		"." +
		Crypto.HmacSHA256( //signature
			Buffer.from(JSON.stringify(head)).toString("base64").replace(/=/g,"") +//head
			"." +
			Buffer.from(JSON.stringify(body)).toString("base64").replace(/=/g,""),//body
			mac //mac
		).toString(Crypto.enc.Base64).replace(/=/g,"") //buffer to base64
	}
}

export {JWT}


/* console.log(JWT.newJwt(
	{
		"alg": "HS256",
		"typ": "JWT"
	},
	{
		"sub": "1234567890",
		"name": "John Doe",
		"iat": 1516239022
	},
	"secret"
)) */

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.zhyC46fZGtHl8opXmCHlSGdS4KnkOAhrkIPRo9UJzLg  mac.toBase64
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.PcmVIPbcZl9j7qFzXRAeSyhtuBnHQNMuLHsaG5l804A  jwt.io secret base64 encoded
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o	jwt.io out
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o  my out