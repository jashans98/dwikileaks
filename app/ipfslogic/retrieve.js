var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
var ipfsAPI = require('ipfs-api');


function decryptFile(dataToDecrypt, privateKey){
	// God Bless this synchronus function.
	var buffer = new Buffer(dataToDecrypt);
	var decryptedFile = crypto.publicDecrypt(privateKey, buffer);
	//console.log(typeof(encryptedFile))
	return decryptedFile
}

function getFileFromIPFS(hash) {
	var ipfsAPI = require('ipfs-api')
	var ipfs = ipfsAPI(
		'ipfs.infura.io',
		'5001',
		{
			protocol: 'https'
		}
	)
	//var buffer = new Buffer("I'm a string!", "utf-8")

	return ipfs.files.get(hash)
}


function decryptFile(dataToDecrypt, privateKey){
	// God Bless this synchronus function.
	var buffer = new Buffer(dataToDecrypt);
	var decryptedFile = crypto.publicDecrypt(privateKey, buffer);
	console.log(typeof(decryptedFile))
	return decryptedFile
}


function retrieveFileToIPFS(hash, privateKey){
	getFileFromIPFS(hash)
		.then((stream) => {  
			stream.on('data', (file) => {
		    encrypted_data = new Buffer(file.content.read().toString());
		    decrypted_data = crypto.publicDecrypt(privateKey, encrypted_data);
		    console.log(decrypted_data)
	  	})
	})}

var absolutePath = path.resolve("rsakeys/rsa_1024_dwight.pem");
var privateKeyTest = fs.readFileSync(absolutePath, "utf8");
var hash = "Qmdoj5MojJ37HdZC3hCvHagN5KvvsLdUxmZvukLqjToLbC";

console.log("Running decrypt");
retrieveFileToIPFS(hash, privateKeyTest);