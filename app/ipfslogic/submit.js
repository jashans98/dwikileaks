var cryptico = require("cryptico");
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

	return ipfs.files.add(new Buffer(data.cipher))
}

const encryptFile = data => {
	const _key = cryptico.generateRSAKey('key', 1024)
	const key = cryptico.publicKeyString(_key)

	// God Bless this synchronus function.
	var encryptedFile = cryptico.encrypt(data, key);
	//console.log(typeof(encryptedFile))
	return encryptedFile
}

const sendFileToIPFS = data => {
	console.log(data);
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