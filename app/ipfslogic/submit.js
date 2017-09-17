var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
var ipfsAPI = require('ipfs-api');


function addFileToIPFS(data) {
	var ipfs = ipfsAPI(
		'ipfs.infura.io',
		'5001',
		{
			protocol: 'https'
		}
	)
	//var buffer = new Buffer("I'm a string!", "utf-8")

	return ipfs.files.add(data)
}

function encryptFile(filePath, publicKey){
	// God Bless this synchronus function.
	var absolutePath = path.resolve(filePath);
	var fileToEncrypt = fs.readFileSync(absolutePath).toString();
	console.log(fileToEncrypt)
	var buffer = new Buffer(fileToEncrypt);
	var encryptedFile = crypto.publicEncrypt(publicKey, buffer);
	//console.log(typeof(encryptedFile))
	return encryptedFile
}

function sendFileToIPFS(filePath, publicKey){
	addFileToIPFS(encryptFile(filePath, publicKey))
		.then(res => {
			hash = res[0]['hash'];
			LeakApp.handleSubmit(hash); 
			console.log(hash)});
}