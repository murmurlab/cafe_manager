import {JWT} from "./jwt.js"

const token = JWT.newJwt(
	{
		"alg": "HS256",
		"typ": "JWT"
	},
	{
		"sub": "1234567890",
		"name": "main",
		"iat": 0
	},
	"secret"
)

console.log(token)

