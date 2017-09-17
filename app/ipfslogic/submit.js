var crypto = require("crypto-js");
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

	return ipfs.files.add(data)
}

const encryptFile = (filePath, publicKey) => {
	// God Bless this synchronus function.
	var buffer = new Buffer(filePath);
	var encryptedFile = crypto.publicEncrypt(publicKey, buffer);
	//console.log(typeof(encryptedFile))
	return encryptedFile
}

const sendFileToIPFS = (filePath, publicKey) => {
	addFileToIPFS(encryptFile(filePath, publicKey))
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