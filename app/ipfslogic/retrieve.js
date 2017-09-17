var cryptico = require("cryptico");
var ipfsAPI = require('ipfs-api');
var fileDownload = require('react-file-download');


function getFileFromIPFS(hash) {
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

const retrieveFileToIPFS = (hash, callback) => {
	//. TODO: REMOVE ME
	hash = "Qmdoj5MojJ37HdZC3hCvHagN5KvvsLdUxmZvukLqjToLbC";

	getFileFromIPFS(hash)
		.then((stream) => {
			stream.on('data', (file) => {
				const key = cryptico.generateRSAKey('key', 1024)

				const encrypted_data = file.content.read().toString()
				const decrypted_data = cryptico.decrypt(encrypted_data, key)

				// TODO: decrypted_data currently is a failure obj.

				fileDownload(decrypted_data, 'download.txt');
			})
	})}

module.exports = {
	retrieveFileToIPFS,
}