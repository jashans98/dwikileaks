var jsencrypt = require("jsencrypt");
var ipfsAPI = require('ipfs-api');

const addFileToIPFS = (data) => {
	var ipfs = ipfsAPI(
		'ipfs.infura.io',
		'5001',
		{
			protocol: 'https'
		}
	)
	//var buffer = new Buffer("I'm a string!", "utf-8")

	return ipfs.files.add(new Buffer(data))
}

const encryptFile = data => {
	const key = '-----BEGIN PUBLIC KEY-----\n'+
		'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN\n'+
		'FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76\n'+
		'xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4\n'+
		'gwQco1KRMDSmXSMkDwIDAQAB'+
		'-----END PUBLIC KEY-----'

	var encrypt = new jsencrypt.JSEncrypt()
	encrypt.setPublicKey(key)

	return encrypt.encrypt(data)
}

const sendFileToIPFS = data => {
	addFileToIPFS(encryptFile(data))
		.then(res => {
			const hash = res[0]['hash'];
			console.log('hash', hash);
			window.LeakApp.handleSubmit(hash); 
		})
}

module.exports =	{
	addFileToIPFS,
	encryptFile,
	sendFileToIPFS,
}